document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const numberInput = document.getElementById('numberInput');
    const searchBtn = document.getElementById('searchBtn');
    const advancedBtn = document.getElementById('advancedBtn');
    const networkFilter = document.getElementById('networkFilter');
    const resultContainer = document.getElementById('resultContainer');
    const advancedModal = document.getElementById('advancedModal');
    const closeBtn = document.querySelector('.close-btn');
    const advancedForm = document.getElementById('advancedForm');

    // Event Listeners
    searchBtn.addEventListener('click', handleSearch);
    advancedBtn.addEventListener('click', openAdvancedModal);
    closeBtn.addEventListener('click', closeAdvancedModal);
    advancedForm.addEventListener('submit', handleAdvancedSearch);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === advancedModal) {
            closeAdvancedModal();
        }
    });

    // Functions
    function handleSearch() {
        const number = numberInput.value.trim();
        const network = networkFilter.value;
        
        if (!validateNumber(number)) {
            showError("Please enter a valid 11-digit Pakistani mobile number (e.g., 03001234567)");
            return;
        }
        
        showLoading();
        
        // Simulate API call with timeout
        setTimeout(() => {
            fetchSimData(number, network);
        }, 1500);
    }

    function handleAdvancedSearch(e) {
        e.preventDefault();
        const number = numberInput.value.trim();
        const cnic = document.getElementById('cnicSearch').value.trim();
        const name = document.getElementById('nameSearch').value.trim();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const network = networkFilter.value;
        
        if (number === '' && cnic === '' && name === '') {
            showError("Please provide at least one search parameter (number, CNIC, or name)");
            return;
        }
        
        showLoading();
        closeAdvancedModal();
        
        // Simulate API call with timeout
        setTimeout(() => {
            fetchAdvancedSimData(number, cnic, name, startDate, endDate, network);
        }, 2000);
    }

    function validateNumber(number) {
        const regex = /^((03\d{9})|(\+923\d{9}))$/;
        return regex.test(number);
    }

    function showLoading() {
        resultContainer.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Connecting to PTA Secure Database...</p>
            </div>
        `;
    }

    function showError(message) {
        resultContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
    }

    function openAdvancedModal() {
        advancedModal.style.display = 'block';
    }

    function closeAdvancedModal() {
        advancedModal.style.display = 'none';
    }

    function fetchSimData(number, network) {
        // This is simulated data - in a real app, you would call an actual API
        const simulatedData = {
            success: true,
            data: {
                number: number,
                network: getRandomNetwork(),
                status: "Active",
                registrationDate: getRandomDate(),
                ownerName: getRandomName(),
                cnic: generateRandomCNIC(),
                address: getRandomAddress(),
                biometricVerified: Math.random() > 0.2,
                familySim: Math.random() > 0.7,
                registeredAgainst: Math.random() > 0.5 ? "Self" : "Family Member",
                totalSims: Math.floor(Math.random() * 5) + 1
            }
        };
        
        // Filter by network if specified
        if (network !== 'all' && simulatedData.data.network.toLowerCase() !== network) {
            showError(`No results found for ${number} on ${network.toUpperCase()} network`);
            return;
        }
        
        displayResults(simulatedData.data);
    }

    function fetchAdvancedSimData(number, cnic, name, startDate, endDate, network) {
        // Simulate advanced search with multiple results
        const resultCount = Math.floor(Math.random() * 3) + 1;
        const results = [];
        
        for (let i = 0; i < resultCount; i++) {
            results.push({
                number: number || generateRandomNumber(),
                network: network === 'all' ? getRandomNetwork() : network.charAt(0).toUpperCase() + network.slice(1),
                status: Math.random() > 0.2 ? "Active" : "Blocked",
                registrationDate: getRandomDate(),
                ownerName: name || getRandomName(),
                cnic: cnic || generateRandomCNIC(),
                address: getRandomAddress(),
                biometricVerified: Math.random() > 0.2,
                familySim: Math.random() > 0.7,
                registeredAgainst: Math.random() > 0.5 ? "Self" : "Family Member",
                totalSims: Math.floor(Math.random() * 5) + 1
            });
        }
        
        displayAdvancedResults(results);
    }

    function displayResults(data) {
        const networkClass = data.network.toLowerCase() + '-badge';
        
        resultContainer.innerHTML = `
            <div class="sim-result">
                <div class="result-header">
                    <h2 class="result-title">SIM Details</h2>
                    <span class="result-status">${data.status}</span>
                </div>
                
                <div class="result-details">
                    <div class="detail-group">
                        <div class="detail-item">
                            <div class="detail-label">Mobile Number</div>
                            <div class="detail-value">${data.number}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Network</div>
                            <div class="detail-value"><span class="network-badge ${networkClass}">${data.network}</span></div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Registration Date</div>
                            <div class="detail-value">${formatDate(data.registrationDate)}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Biometric Verification</div>
                            <div class="detail-value">${data.biometricVerified ? 'Verified' : 'Not Verified'}</div>
                        </div>
                    </div>
                    
                    <div class="detail-group">
                        <div class="detail-item">
                            <div class="detail-label">Owner Name</div>
                            <div class="detail-value">${data.ownerName}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">CNIC</div>
                            <div class="detail-value">${data.cnic}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Address</div>
                            <div class="detail-value">${data.address}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Registered Against</div>
                            <div class="detail-value">${data.registeredAgainst}</div>
                        </div>
                    </div>
                    
                    <div class="detail-group">
                        <div class="detail-item">
                            <div class="detail-label">SIM Type</div>
                            <div class="detail-value">${data.familySim ? 'Family SIM' : 'Individual SIM'}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Total SIMs Registered</div>
                            <div class="detail-value">${data.totalSims}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Last Activity</div>
                            <div class="detail-value">${getRandomLastActivity()}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">PTA Verification</div>
                            <div class="detail-value">Verified</div>
                        </div>
                    </div>
                </div>
                
                <div class="result-footer">
                    <p><i class="fas fa-info-circle"></i> This information is provided by Pakistan Telecommunication Authority under PTA Regulations 2025.</p>
                </div>
            </div>
        `;
    }

    function displayAdvancedResults(results) {
        if (results.length === 0) {
            showError("No results found matching your search criteria");
            return;
        }
        
        let html = `<div class="advanced-results"><h2>Search Results (${results.length})</h2>`;
        
        results.forEach((data, index) => {
            const networkClass = data.network.toLowerCase() + '-badge';
            
            html += `
                <div class="sim-result" style="margin-bottom: 30px; padding-bottom: 20px; ${index < results.length - 1 ? 'border-bottom: 1px solid #eee;' : ''}">
                    <div class="result-header">
                        <h3 class="result-title">Result ${index + 1}</h3>
                        <span class="result-status">${data.status}</span>
                    </div>
                    
                    <div class="result-details">
                        <div class="detail-group">
                            <div class="detail-item">
                                <div class="detail-label">Mobile Number</div>
                                <div class="detail-value">${data.number}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Network</div>
                                <div class="detail-value"><span class="network-badge ${networkClass}">${data.network}</span></div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Owner Name</div>
                                <div class="detail-value">${data.ownerName}</div>
                            </div>
                        </div>
                        
                        <div class="detail-group">
                            <div class="detail-item">
                                <div class="detail-label">CNIC</div>
                                <div class="detail-value">${data.cnic}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Registration Date</div>
                                <div class="detail-value">${formatDate(data.registrationDate)}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Total SIMs</div>
                                <div class="detail-value">${data.totalSims}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
        resultContainer.innerHTML = html;
    }

    // Helper functions for generating random data
    function getRandomNetwork() {
        const networks = ['Jazz', 'Zong', 'Telenor', 'Ufone'];
        return networks[Math.floor(Math.random() * networks.length)];
    }

    function getRandomDate() {
        const start = new Date(2015, 0, 1);
        const end = new Date();
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function getRandomName() {
        const firstNames = ['Muhammad', 'Ali', 'Ahmed', 'Usman', 'Bilal', 'Hassan', 'Hussain', 'Abdullah', 'Omar', 'Ibrahim'];
        const lastNames = ['Khan', 'Ali', 'Ahmed', 'Malik', 'Raza', 'Hussain', 'Shah', 'Baig', 'Qureshi', 'Sheikh'];
        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    }

    function generateRandomCNIC() {
        const part1 = Math.floor(10000 + Math.random() * 90000);
        const part2 = Math.floor(1000000 + Math.random() * 9000000);
        const part3 = Math.floor(1 + Math.random() * 9);
        return `${part1}-${part2}-${part3}`;
    }

    function generateRandomNumber() {
        const prefix = ['0300', '0311', '0333', '0345', '0321', '0335', '0336'];
        const suffix = Math.floor(1000000 + Math.random() * 9000000);
        return prefix[Math.floor(Math.random() * prefix.length)] + suffix;
    }

    function getRandomAddress() {
        const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar', 'Quetta', 'Multan', 'Hyderabad', 'Gujranwala'];
        const areas = ['Gulshan', 'DHA', 'Clifton', 'F-8', 'G-9', 'Cantt', 'Model Town', 'Bahria Town', 'Askari', 'Defence'];
        return `${areas[Math.floor(Math.random() * areas.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}`;
    }

    function getRandomLastActivity() {
        const options = ['Today', 'Yesterday', '2 days ago', '1 week ago', '2 weeks ago', '1 month ago'];
        return options[Math.floor(Math.random() * options.length)];
    }

    function formatDate(date) {
        if (!(date instanceof Date)) date = new Date(date);
        return date.toLocaleDateString('en-PK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
});
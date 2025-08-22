// Financial Management Application JavaScript
class FinanceTracker {
    constructor() {
        this.storageAvailable = true;
        this.transactions = this.loadTransactions();
        this.chart = null;
        this.currentPeriod = 'monthly';
        this.translations = {
            es: {
                income: 'Ingresos',
                expenses: 'Gastos',
                savings: 'Ahorros',
                monthlyIncome: 'Ingresos del Mes',
                monthlyExpenses: 'Gastos del Mes',
                monthlySavings: 'Ahorro del Mes',
                totalBalance: 'Balance Total',
                newTransaction: 'Nueva Transacción',
                scanReceipt: 'Escanear Recibo',
                importData: 'Importar Datos',
                createGoal: 'Crear Objetivo',
                recentTransactions: 'Transacciones Recientes',
                expenseCategories: 'Categorías de Gastos',
                financialGoals: 'Objetivos Financieros',
                user: 'Usuario',
                profile: 'Perfil',
                settings: 'Configuración',
                notifications: 'Notificaciones',
                logout: 'Cerrar Sesión'
            },
            en: {
                income: 'Income',
                expenses: 'Expenses',
                savings: 'Savings',
                monthlyIncome: 'Monthly Income',
                monthlyExpenses: 'Monthly Expenses',
                monthlySavings: 'Monthly Savings',
                totalBalance: 'Total Balance',
                newTransaction: 'New Transaction',
                scanReceipt: 'Scan Receipt',
                importData: 'Import Data',
                createGoal: 'Create Goal',
                recentTransactions: 'Recent Transactions',
                expenseCategories: 'Expense Categories',
                financialGoals: 'Financial Goals',
                user: 'User',
                profile: 'Profile',
                settings: 'Settings',
                notifications: 'Notifications',
                logout: 'Logout'
            }
        };
        this.currentLanguage = 'es';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeChart();
        this.updateFinancialSummary();
        this.renderTransactions();
        this.updateCategories();
        this.setCurrentDate();
    }

    setupEventListeners() {
        // User menu toggle
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');
        
        userMenuBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            userDropdown?.classList.remove('show');
        });

        // Language selector
        const languageSelect = document.getElementById('languageSelect');
        languageSelect?.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        // Quick action buttons
        document.getElementById('newTransactionBtn')?.addEventListener('click', () => {
            this.openTransactionModal();
        });

        document.getElementById('scanReceiptBtn')?.addEventListener('click', () => {
            this.handleScanReceipt();
        });

        document.getElementById('importDataBtn')?.addEventListener('click', () => {
            this.handleImportData();
        });

        document.getElementById('createGoalBtn')?.addEventListener('click', () => {
            this.handleCreateGoal();
        });

        // Time period filters
        const timeButtons = document.querySelectorAll('.time-btn');
        timeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                timeButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentPeriod = e.target.dataset.period;
                this.updateChart();
            });
        });

        // Chart legend toggles
        const legendCheckboxes = document.querySelectorAll('.legend-item input');
        legendCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleDataset(e.target.dataset.dataset, e.target.checked);
            });
        });

        // Modal handling
        this.setupModalEventListeners();
        this.setupAllTransactionsModalEventListeners();

        // View all transactions button
        document.querySelector('.view-all-btn')?.addEventListener('click', () => {
            this.openAllTransactionsModal();
        });

        // Footer links
        document.getElementById('rateAppBtn')?.addEventListener('click', () => {
            this.showNotification('¡Gracias por tu valoración!', 'success');
        });

        document.getElementById('feedbackBtn')?.addEventListener('click', () => {
            this.showNotification('Formulario de feedback abierto', 'info');
        });

        document.getElementById('supportBtn')?.addEventListener('click', () => {
            this.showNotification('Contactando con soporte...', 'info');
        });
    }

    setupModalEventListeners() {
        const modal = document.getElementById('transactionModal');
        const closeBtn = modal?.querySelector('.close-btn');
        const cancelBtn = modal?.querySelector('.btn-cancel');
        const form = document.getElementById('transactionForm');

        closeBtn?.addEventListener('click', () => {
            this.closeTransactionModal();
        });

        cancelBtn?.addEventListener('click', () => {
            this.closeTransactionModal();
        });

        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeTransactionModal();
            }
        });

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleTransactionSubmit();
        });

        // Form validation
        const inputs = form?.querySelectorAll('input, select');
        inputs?.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    setupAllTransactionsModalEventListeners() {
        const modal = document.getElementById('allTransactionsModal');
        const closeBtn = document.getElementById('closeAllTransactionsBtn');
        const applyFiltersBtn = document.getElementById('applyFiltersBtn');
        const clearFiltersBtn = document.getElementById('clearFiltersBtn');
        const prevPageBtn = document.getElementById('prevPageBtn');
        const nextPageBtn = document.getElementById('nextPageBtn');

        // Initialize pagination state
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.filteredTransactions = [...this.transactions];

        closeBtn?.addEventListener('click', () => {
            this.closeAllTransactionsModal();
        });

        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeAllTransactionsModal();
            }
        });

        applyFiltersBtn?.addEventListener('click', () => {
            this.applyTransactionFilters();
        });

        clearFiltersBtn?.addEventListener('click', () => {
            this.clearTransactionFilters();
        });

        prevPageBtn?.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderAllTransactions();
            }
        });

        nextPageBtn?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderAllTransactions();
            }
        });
    }

    initializeChart() {
        const ctx = document.getElementById('financialChart');
        if (!ctx) return;

        const chartData = this.generateChartData();
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#e2e8f0',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': €' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: '#f1f5f9',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    },
                    y: {
                        display: true,
                        grid: {
                            color: '#f1f5f9',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#64748b',
                            callback: function(value) {
                                return '€' + value.toLocaleString();
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 8,
                        borderWidth: 2,
                        hoverBorderWidth: 3
                    },
                    line: {
                        borderWidth: 3,
                        tension: 0.4
                    }
                }
            }
        });
    }

    generateChartData() {
        const labels = this.getChartLabels();
        const incomeData = this.getIncomeData();
        const expenseData = this.getExpenseData();
        const savingsData = incomeData.map((income, index) => income - expenseData[index]);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Ingresos',
                    data: incomeData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Gastos',
                    data: expenseData,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Ahorros',
                    data: savingsData,
                    borderColor: '#06b6d4',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    fill: false,
                    tension: 0.4
                }
            ]
        };
    }

    getChartLabels() {
        const now = new Date();
        const labels = [];
        
        switch (this.currentPeriod) {
            case 'daily':
                for (let i = 6; i >= 0; i--) {
                    const date = new Date(now);
                    date.setDate(date.getDate() - i);
                    labels.push(date.toLocaleDateString('es-ES', { weekday: 'short' }));
                }
                break;
            case 'weekly':
                for (let i = 7; i >= 0; i--) {
                    const date = new Date(now);
                    date.setDate(date.getDate() - (i * 7));
                    labels.push(`Sem ${Math.ceil(date.getDate() / 7)}`);
                }
                break;
            case 'monthly':
                for (let i = 11; i >= 0; i--) {
                    const date = new Date(now);
                    date.setMonth(date.getMonth() - i);
                    labels.push(date.toLocaleDateString('es-ES', { month: 'short' }));
                }
                break;
            case 'yearly':
                for (let i = 4; i >= 0; i--) {
                    const date = new Date(now);
                    date.setFullYear(date.getFullYear() - i);
                    labels.push(date.getFullYear().toString());
                }
                break;
        }
        
        return labels;
    }

    getIncomeData() {
        // Sample data - in a real app, this would come from your data source
        switch (this.currentPeriod) {
            case 'daily':
                return [0, 0, 0, 0, 0, 2450, 0];
            case 'weekly':
                return [2450, 2450, 2450, 2450, 2450, 2450, 2450, 2450];
            case 'monthly':
                return [2200, 2300, 2400, 2350, 2450, 2500, 2400, 2450, 2300, 2400, 2450, 2450];
            case 'yearly':
                return [28000, 29500, 30200, 31000, 32500];
        }
    }

    getExpenseData() {
        // Sample data - in a real app, this would come from your data source
        switch (this.currentPeriod) {
            case 'daily':
                return [45, 65, 120, 80, 95, 200, 150];
            case 'weekly':
                return [450, 520, 480, 600, 550, 470, 520, 490];
            case 'monthly':
                return [1800, 1750, 1900, 1850, 1890, 1950, 1800, 1890, 1750, 1800, 1890, 1890];
            case 'yearly':
                return [22000, 21500, 23000, 22800, 24500];
        }
    }

    updateChart() {
        if (!this.chart) return;
        
        const newData = this.generateChartData();
        this.chart.data = newData;
        this.chart.update('active');
    }

    toggleDataset(datasetName, visible) {
        if (!this.chart) return;
        
        const datasetIndex = this.chart.data.datasets.findIndex(dataset => 
            dataset.label.toLowerCase().includes(datasetName)
        );
        
        if (datasetIndex !== -1) {
            this.chart.getDatasetMeta(datasetIndex).hidden = !visible;
            this.chart.update();
        }
    }

    updateFinancialSummary() {
        const monthlyIncome = 2450.00;
        const monthlyExpenses = 1890.50;
        const monthlySavings = monthlyIncome - monthlyExpenses;
        const totalBalance = 12340.75;

        document.getElementById('monthlyIncome').textContent = `€${monthlyIncome.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
        document.getElementById('monthlyExpenses').textContent = `€${monthlyExpenses.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
        document.getElementById('monthlySavings').textContent = `€${monthlySavings.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
        document.getElementById('totalBalance').textContent = `€${totalBalance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
    }

    renderTransactions() {
        const transactionsList = document.getElementById('transactionsList');
        if (!transactionsList) return;

        const recentTransactions = this.transactions.slice(0, 3);
        
        transactionsList.innerHTML = recentTransactions.map(transaction => `
            <div class="transaction-item">
                <div class="transaction-icon ${transaction.type}">
                    <i class="fas ${this.getTransactionIcon(transaction.category)}"></i>
                </div>
                <div class="transaction-details">
                    <span class="transaction-title">${transaction.description}</span>
                    <span class="transaction-category">${this.getCategoryName(transaction.category)}</span>
                    <span class="transaction-date">${this.formatDate(transaction.date)}</span>
                </div>
                <span class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}€${Math.abs(transaction.amount).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </span>
            </div>
        `).join('');
    }

    getTransactionIcon(category) {
        const icons = {
            food: 'fa-shopping-cart',
            transport: 'fa-gas-pump',
            entertainment: 'fa-film',
            utilities: 'fa-home',
            salary: 'fa-briefcase',
            other: 'fa-circle'
        };
        return icons[category] || 'fa-circle';
    }

    getCategoryName(category) {
        const names = {
            food: 'Alimentación',
            transport: 'Transporte',
            entertainment: 'Entretenimiento',
            utilities: 'Servicios',
            salary: 'Trabajo',
            other: 'Otros'
        };
        return names[category] || 'Otros';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Hoy';
        if (diffDays === 2) return 'Ayer';
        if (diffDays <= 7) return `Hace ${diffDays - 1} días`;
        
        return date.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    updateCategories() {
        // This would typically fetch real data from your backend
        const categories = [
            { name: 'Alimentación', amount: 450.30, percentage: 65 },
            { name: 'Transporte', amount: 320.80, percentage: 45 },
            { name: 'Entretenimiento', amount: 180.50, percentage: 25 }
        ];

        // Update category progress bars with animation
        setTimeout(() => {
            categories.forEach((category, index) => {
                const progressBar = document.querySelectorAll('.category-progress')[index];
                if (progressBar) {
                    progressBar.style.width = `${category.percentage}%`;
                }
            });
        }, 500);
    }

    openTransactionModal() {
        const modal = document.getElementById('transactionModal');
        modal?.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeTransactionModal() {
        const modal = document.getElementById('transactionModal');
        modal?.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.resetTransactionForm();
    }

    resetTransactionForm() {
        const form = document.getElementById('transactionForm');
        form?.reset();
        this.clearValidationErrors();
    }

    handleTransactionSubmit() {
        const form = document.getElementById('transactionForm');
        const formData = new FormData(form);
        
        const transaction = {
            id: Date.now(),
            type: document.getElementById('transactionType').value,
            amount: parseFloat(document.getElementById('transactionAmount').value),
            category: document.getElementById('transactionCategory').value,
            description: document.getElementById('transactionDescription').value,
            date: document.getElementById('transactionDate').value
        };

        if (this.validateTransaction(transaction)) {
            this.addTransaction(transaction);
            this.closeTransactionModal();
            this.showNotification('Transacción guardada exitosamente', 'success');
        }
    }

    validateTransaction(transaction) {
        let isValid = true;
        
        if (!transaction.type) {
            this.showFieldError('transactionType', 'Selecciona un tipo de transacción');
            isValid = false;
        }
        
        if (!transaction.amount || transaction.amount <= 0) {
            this.showFieldError('transactionAmount', 'Ingresa una cantidad válida');
            isValid = false;
        }
        
        if (!transaction.category) {
            this.showFieldError('transactionCategory', 'Selecciona una categoría');
            isValid = false;
        }
        
        if (!transaction.description.trim()) {
            this.showFieldError('transactionDescription', 'Ingresa una descripción');
            isValid = false;
        }
        
        if (!transaction.date) {
            this.showFieldError('transactionDate', 'Selecciona una fecha');
            isValid = false;
        }
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field.id, 'Este campo es obligatorio');
            isValid = false;
        } else if (field.type === 'number' && value && parseFloat(value) <= 0) {
            this.showFieldError(field.id, 'Debe ser un número positivo');
            isValid = false;
        } else {
            this.clearFieldError(field.id);
        }
        
        return isValid;
    }

    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const existingError = field.parentNode.querySelector('.field-error');
        
        if (existingError) {
            existingError.textContent = message;
        } else {
            const errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            errorElement.style.color = 'var(--danger-color)';
            errorElement.style.fontSize = 'var(--font-size-sm)';
            errorElement.style.marginTop = 'var(--spacing-1)';
            errorElement.style.display = 'block';
            field.parentNode.appendChild(errorElement);
        }
        
        field.style.borderColor = 'var(--danger-color)';
    }

    clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = field.parentNode.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        field.style.borderColor = 'var(--border-light)';
    }

    clearValidationErrors() {
        const errors = document.querySelectorAll('.field-error');
        errors.forEach(error => error.remove());
        
        const fields = document.querySelectorAll('#transactionForm input, #transactionForm select');
        fields.forEach(field => {
            field.style.borderColor = 'var(--border-light)';
        });
    }

    addTransaction(transaction) {
        this.transactions.unshift(transaction);
        this.saveTransactions();
        this.renderTransactions();
        this.updateFinancialSummary();
        this.updateChart();
        this.updateCategories();
    }

    loadTransactions() {
        try {
            const stored = localStorage.getItem('financeTracker_transactions');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error accediendo a localStorage:', error);
            this.storageAvailable = false;
            this.showNotification('Almacenamiento local no disponible. La persistencia se ha deshabilitado.', 'error');
        }

        // Default sample transactions
        return [
            {
                id: 1,
                type: 'expense',
                amount: 45.20,
                category: 'food',
                description: 'Supermercado',
                date: new Date().toISOString().split('T')[0]
            },
            {
                id: 2,
                type: 'income',
                amount: 2450.00,
                category: 'salary',
                description: 'Salario',
                date: new Date(Date.now() - 86400000).toISOString().split('T')[0]
            },
            {
                id: 3,
                type: 'expense',
                amount: 65.00,
                category: 'transport',
                description: 'Gasolina',
                date: new Date(Date.now() - 172800000).toISOString().split('T')[0]
            }
        ];
    }

    saveTransactions() {
        if (!this.storageAvailable) {
            return;
        }
        try {
            localStorage.setItem('financeTracker_transactions', JSON.stringify(this.transactions));
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
            this.storageAvailable = false;
            this.showNotification('No se pudo guardar en el almacenamiento local. La persistencia se ha deshabilitado.', 'error');
        }
    }

    setCurrentDate() {
        const dateInput = document.getElementById('transactionDate');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    }

    handleScanReceipt() {
        // Simulate receipt scanning
        this.showNotification('Función de escaneo en desarrollo', 'info');
        
        // In a real app, this would:
        // 1. Open camera or file picker
        // 2. Use OCR to extract transaction data
        // 3. Pre-fill the transaction form
    }

    handleImportData() {
        // Create file input for CSV import
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv,.xlsx,.xls';
        input.style.display = 'none';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.processImportFile(file);
            }
        };
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }

    processImportFile(file) {
        // Simulate file processing
        this.showNotification(`Procesando archivo: ${file.name}`, 'info');
        
        // In a real app, this would:
        // 1. Parse CSV/Excel file
        // 2. Validate data format
        // 3. Import transactions
        // 4. Update UI
        
        setTimeout(() => {
            this.showNotification('Datos importados exitosamente', 'success');
        }, 2000);
    }

    handleCreateGoal() {
        // Simulate goal creation
        this.showNotification('Formulario de objetivos en desarrollo', 'info');
        
        // In a real app, this would open a goal creation modal
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        this.updateUILanguage();
        localStorage.setItem('financeTracker_language', language);
    }

    updateUILanguage() {
        const translations = this.translations[this.currentLanguage];
        
        // Update chart labels
        if (this.chart) {
            this.chart.data.datasets.forEach((dataset, index) => {
                const keys = ['income', 'expenses', 'savings'];
                dataset.label = translations[keys[index]];
            });
            this.chart.update();
        }
        
        // Update other UI elements as needed
        // This is a simplified implementation
    }

    openAllTransactionsModal() {
        const modal = document.getElementById('allTransactionsModal');
        this.filteredTransactions = [...this.transactions];
        this.currentPage = 1;
        this.renderAllTransactions();
        modal?.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeAllTransactionsModal() {
        const modal = document.getElementById('allTransactionsModal');
        modal?.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    renderAllTransactions() {
        const allTransactionsList = document.getElementById('allTransactionsList');
        const totalTransactionsCount = document.getElementById('totalTransactionsCount');
        const totalIncomeAmount = document.getElementById('totalIncomeAmount');
        const totalExpenseAmount = document.getElementById('totalExpenseAmount');
        const paginationInfo = document.getElementById('paginationInfo');
        const prevPageBtn = document.getElementById('prevPageBtn');
        const nextPageBtn = document.getElementById('nextPageBtn');

        if (!allTransactionsList) return;

        // Calculate totals
        const totalIncome = this.filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const totalExpense = this.filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        // Update summary
        totalTransactionsCount.textContent = this.filteredTransactions.length;
        totalIncomeAmount.textContent = `€${totalIncome.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
        totalExpenseAmount.textContent = `€${totalExpense.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;

        // Pagination
        const totalPages = Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageTransactions = this.filteredTransactions.slice(startIndex, endIndex);

        // Update pagination info
        paginationInfo.textContent = `Página ${this.currentPage} de ${totalPages || 1}`;
        prevPageBtn.disabled = this.currentPage <= 1;
        nextPageBtn.disabled = this.currentPage >= totalPages;

        // Render transactions
        allTransactionsList.innerHTML = pageTransactions.map(transaction => `
            <div class="transaction-item">
                <div class="transaction-icon ${transaction.type}">
                    <i class="fas ${this.getTransactionIcon(transaction.category)}"></i>
                </div>
                <div class="transaction-details">
                    <span class="transaction-title">${transaction.description}</span>
                    <span class="transaction-category">${this.getCategoryName(transaction.category)}</span>
                    <span class="transaction-date">${this.formatTransactionDate(transaction.date)}</span>
                </div>
                <span class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}€${Math.abs(transaction.amount).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </span>
            </div>
        `).join('');
    }

    formatTransactionDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { 
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    applyTransactionFilters() {
        const typeFilter = document.getElementById('filterType').value;
        const categoryFilter = document.getElementById('filterCategory').value;
        const dateFromFilter = document.getElementById('filterDateFrom').value;
        const dateToFilter = document.getElementById('filterDateTo').value;

        this.filteredTransactions = this.transactions.filter(transaction => {
            // Type filter
            if (typeFilter !== 'all' && transaction.type !== typeFilter) {
                return false;
            }

            // Category filter
            if (categoryFilter !== 'all' && transaction.category !== categoryFilter) {
                return false;
            }

            // Date filters
            const transactionDate = new Date(transaction.date);
            if (dateFromFilter && transactionDate < new Date(dateFromFilter)) {
                return false;
            }
            if (dateToFilter && transactionDate > new Date(dateToFilter)) {
                return false;
            }

            return true;
        });

        this.currentPage = 1;
        this.renderAllTransactions();
        this.showNotification('Filtros aplicados', 'success');
    }

    clearTransactionFilters() {
        document.getElementById('filterType').value = 'all';
        document.getElementById('filterCategory').value = 'all';
        document.getElementById('filterDateFrom').value = '';
        document.getElementById('filterDateTo').value = '';
        
        this.filteredTransactions = [...this.transactions];
        this.currentPage = 1;
        this.renderAllTransactions();
        this.showNotification('Filtros limpiados', 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1100;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: var(--shadow-lg);
        `;
        
        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#06b6d4'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FinanceTracker();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FinanceTracker;
}

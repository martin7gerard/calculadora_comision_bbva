document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const resultsGrid = document.getElementById('results');

    // Commission configurations
    const tiers = [
        {
            name: "Contado",
            months: 1,
            rate: 2.25, // 2.25% + IVA
            min: 0,
            desc: "2.25% + IVA"
        },
        {
            name: "3 Meses sin Intereses",
            months: 3,
            rate: 7.7, // 4.8% + 2.9%
            min: 300,
            desc: "7.7% + IVA"
        },
        {
            name: "6 Meses sin Intereses",
            months: 6,
            rate: 10.7, // 7.8% + 2.9%
            min: 600,
            desc: "10.7% + IVA"
        },
        {
            name: "9 Meses sin Intereses",
            months: 9,
            rate: 13.7, // 10.8% + 2.9%
            min: 900,
            desc: "13.7% + IVA"
        },
        {
            name: "12 Meses sin Intereses",
            months: 12,
            rate: 16.7, // 13.8% + 2.9%
            min: 1200,
            desc: "16.7% + IVA"
        }
    ];

    const IVA = 0.16;

    // Helper to format currency
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount);
    };

    const calculate = () => {
        const netAmount = parseFloat(amountInput.value);
        resultsGrid.innerHTML = ''; // Clear previous results

        if (isNaN(netAmount) || netAmount <= 0) {
            resultsGrid.innerHTML = '<p class="error-msg" style="width:100%; text-align:center;">Por favor ingresa un monto válido.</p>';
            return;
        }

        tiers.forEach(tier => {
            // Logic:
            // Net = Gross - (Gross * Rate% * (1 + IVA))
            // Net = Gross * (1 - Rate% * 1.16)
            // Gross = Net / (1 - Rate% * 1.16)
            
            const rateDecimal = tier.rate / 100;
            const effectiveRate = rateDecimal * (1 + IVA);
            const grossAmount = netAmount / (1 - effectiveRate);
            
            // Re-calculate fees to display breakdown
            const commission = grossAmount * rateDecimal;
            const tax = commission * IVA;
            const totalFee = commission + tax;
            
            // Check minimum amount for MSI
            // The minimum applies to the Transaction Amount (Gross Amount), usually. 
            // Or is it the "Monto mínimo de venta"? 
            // BBVA usually refers to the sale amount, so Gross Amount.
            // Let's assume Gross Amount must be >= Min.
            
            let isValid = true;
            let msg = '';

            // Using grossAmount against min, because usually the min restriction is on the total card charge.
            if (grossAmount < tier.min) {
                isValid = false;
                msg = `Monto mínimo: ${formatMoney(tier.min)}`;
            }

            // Generate Card HTML
            const card = document.createElement('div');
            card.className = `card ${tier.months === 1 ? 'card-contado' : ''}`;
            
            let monthlyPayment = 0;
            if (tier.months > 1) {
                monthlyPayment = grossAmount / tier.months;
            }

            const activeClass = isValid ? 'active' : 'disabled';
            const opacityStyle = isValid ? '' : 'opacity: 0.6; pointer-events: none;';

            card.innerHTML = `
                <div class="card-header" style="${opacityStyle}">
                    <div class="card-title">${tier.name}</div>
                    <div class="card-rate">${tier.desc}</div>
                </div>
                
                <div class="card-body" style="${opacityStyle}">
                    <div class="result-row">
                        <span class="result-label">Cobrar al cliente:</span>
                    </div>
                    <div class="result-row">
                        <span class="result-value large">${formatMoney(grossAmount)}</span>
                    </div>
                    
                    <div class="result-row" style="margin-top: 0.5rem; font-size: 0.85rem;">
                         <span class="result-label">Comisión Total:</span>
                         <span class="result-value" style="color: var(--error-color); font-weight: normal;">-${formatMoney(totalFee)}</span>
                    </div>

                    ${tier.months > 1 ? `
                    <div class="monthly-payment">
                        <span class="desc">Pago mensual al cliente (${tier.months} meses)</span>
                        <span class="amount">${formatMoney(monthlyPayment)}</span>
                    </div>
                    ` : ''}
                </div>
                ${!isValid ? `<div class="error-msg">${msg}</div>` : ''}
            `;
            
            resultsGrid.appendChild(card);
        });
    };

    // Calculate immediately and on input
    calculate();
    amountInput.addEventListener('input', calculate);
});

// Toggle side menu
function toggleMenu() {
  const sideMenu = document.querySelector('.side-menu');
  sideMenu.classList.toggle('open');
}

// Close side menu when clicking outside
document.addEventListener('click', function(event) {
  const sideMenu = document.querySelector('.side-menu');
  const menuButton = document.querySelector('.menu-button');
  
  if (sideMenu && menuButton && sideMenu.classList.contains('open') && 
      !sideMenu.contains(event.target) && event.target !== menuButton) {
    sideMenu.classList.remove('open');
  }
});

// Show modal
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
  }
}

// Close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
  }
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Navigate to page
function navigateTo(page) {
  window.location.href = page;
}

// Format date to DD.MM.YYYY
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return `${day}.${month}.${year}`;
}

// Format phone number
function formatPhone(phone) {
  if (!phone) return '';
  
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as +XXX XX XXX XXXX
  if (cleaned.length === 12) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  
  return phone;
}

// Calculate total area from measurements
function calculateTotalArea(measurements) {
  return measurements.reduce((total, item) => {
    const area = (item.width * item.height * item.quantity) / 1000000; // Convert to m²
    return total + area;
  }, 0).toFixed(2);
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('₴', '') + '₴';
} 
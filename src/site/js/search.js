// Dados de exemplo (em um sistema real, viriam de uma API)
const propertiesData = [
    {
        id: 1,
        title: "Casa Moderna - Jardins",
        address: "Rua das Flores, 123 - Jardins, São Paulo - SP",
        price: 1200000,
        type: "casa",
        purpose: "venda",
        bedrooms: 3,
        bathrooms: 2,
        garage: 2,
        area: 180,
        features: ["piscina", "churrasqueira", "varanda"],
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        createdAt: "2023-05-15"
    },
    {
        id: 2,
        title: "Apartamento - Centro",
        address: "Av. Paulista, 1000 - Centro, São Paulo - SP",
        price: 450000,
        type: "apartamento",
        purpose: "venda",
        bedrooms: 2,
        bathrooms: 1,
        garage: 1,
        area: 65,
        features: ["elevador", "academia"],
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        createdAt: "2023-05-10"
    },
    {
        id: 3,
        title: "Casa de Campo - Interior",
        address: "Estrada Rural, km 10 - Interior, SP",
        price: 850000,
        type: "casa",
        purpose: "venda",
        bedrooms: 4,
        bathrooms: 3,
        garage: 4,
        area: 350,
        features: ["piscina", "churrasqueira", "varanda"],
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        createdAt: "2023-05-05"
    },
    {
        id: 4,
        title: "Apartamento Compacto - Pinheiros",
        address: "Rua dos Pinheiros, 101 - Pinheiros, São Paulo - SP",
        price: 1800,
        type: "apartamento",
        purpose: "aluguel",
        bedrooms: 1,
        bathrooms: 1,
        garage: 0,
        area: 45,
        features: ["elevador"],
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        createdAt: "2023-04-28"
    },
    {
        id: 5,
        title: "Casa Reformada - Cerqueira César",
        address: "Alameda Santos, 202 - Cerqueira César, São Paulo - SP",
        price: 620000,
        type: "casa",
        purpose: "venda",
        bedrooms: 3,
        bathrooms: 2,
        garage: 2,
        area: 150,
        features: ["varanda"],
        image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        createdAt: "2023-04-20"
    },
    {
        id: 6,
        title: "Sobrado - Vila Nova",
        address: "Rua das Palmeiras, 789 - Vila Nova, São Paulo - SP",
        price: 950000,
        type: "casa",
        purpose: "venda",
        bedrooms: 4,
        bathrooms: 3,
        garage: 2,
        area: 220,
        features: ["piscina", "churrasqueira"],
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        createdAt: "2023-04-15"
    },
    {
        id: 7,
        title: "Apartamento Luxo - Moema",
        address: "Av. Ibirapuera, 2000 - Moema, São Paulo - SP",
        price: 3500,
        type: "apartamento",
        purpose: "aluguel",
        bedrooms: 3,
        bathrooms: 2,
        garage: 2,
        area: 120,
        features: ["piscina", "academia", "elevador", "varanda"],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        createdAt: "2023-04-10"
    },
    {
        id: 8,
        title: "Terreno Residencial - Interlagos",
        address: "Av. Interlagos, 5000 - Interlagos, São Paulo - SP",
        price: 320000,
        type: "terreno",
        purpose: "venda",
        bedrooms: 0,
        bathrooms: 0,
        garage: 0,
        area: 400,
        features: [],
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        createdAt: "2023-04-05"
    }
];

// Variáveis de estado
let currentPage = 1;
const propertiesPerPage = 4;
let filteredProperties = [...propertiesData];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa os sliders de preço e área
    initSliders();
    
    // Configura os botões de quantidade
    setupQuantityButtons();
    
    // Carrega os imóveis iniciais
    renderProperties();
    
    // Configura o formulário de busca
    document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        currentPage = 1;
        filterProperties();
    });
    
    // Configura o botão de limpar filtros
    document.getElementById('reset-filters').addEventListener('click', function() {
        currentPage = 1;
        resetFilters();
    });
    
    // Configura a ordenação
    document.getElementById('sort-by').addEventListener('change', function() {
        sortProperties();
        renderProperties();
    });
    
    // Configura a paginação
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderProperties();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProperties();
        }
    });
});

// Inicializa os sliders de preço e área
function initSliders() {
    // Slider de preço
    const priceSlider = document.getElementById('price-range');
    noUiSlider.create(priceSlider, {
        start: [0, 5000000],
        connect: true,
        range: {
            'min': 0,
            'max': 5000000
        },
        step: 10000,
        format: {
            to: function(value) {
                return Math.round(value);
            },
            from: function(value) {
                return Number(value);
            }
        }
    });
    
    priceSlider.noUiSlider.on('update', function(values) {
        document.getElementById('min-price').textContent = formatCurrency(values[0]);
        document.getElementById('max-price').textContent = formatCurrency(values[1]);
    });
    
    // Slider de área
    const areaSlider = document.getElementById('area-range');
    noUiSlider.create(areaSlider, {
        start: [0, 1000],
        connect: true,
        range: {
            'min': 0,
            'max': 1000
        },
        step: 10,
        format: {
            to: function(value) {
                return Math.round(value);
            },
            from: function(value) {
                return Number(value);
            }
        }
    });
    
    areaSlider.noUiSlider.on('update', function(values) {
        document.getElementById('min-area').textContent = values[0];
        document.getElementById('max-area').textContent = values[1];
    });
}

// Configura os botões de quantidade
function setupQuantityButtons() {
    // Quartos
    document.getElementById('bedrooms-minus').addEventListener('click', function() {
        const input = document.getElementById('bedrooms');
        if (input.value > 0) input.value--;
    });
    
    document.getElementById('bedrooms-plus').addEventListener('click', function() {
        const input = document.getElementById('bedrooms');
        input.value++;
    });
    
    // Banheiros
    document.getElementById('bathrooms-minus').addEventListener('click', function() {
        const input = document.getElementById('bathrooms');
        if (input.value > 0) input.value--;
    });
    
    document.getElementById('bathrooms-plus').addEventListener('click', function() {
        const input = document.getElementById('bathrooms');
        input.value++;
    });
    
    // Vagas
    document.getElementById('garage-minus').addEventListener('click', function() {
        const input = document.getElementById('garage');
        if (input.value > 0) input.value--;
    });
    
    document.getElementById('garage-plus').addEventListener('click', function() {
        const input = document.getElementById('garage');
        input.value++;
    });
}

// Filtra os imóveis com base nos critérios selecionados
function filterProperties() {
    const searchTerm = document.getElementById('search-term').value.toLowerCase();
    const propertyType = document.getElementById('property-type').value;
    const purpose = document.getElementById('purpose').value;
    const bedrooms = parseInt(document.getElementById('bedrooms').value);
    const bathrooms = parseInt(document.getElementById('bathrooms').value);
    const garage = parseInt(document.getElementById('garage').value);
    
    // Obtém os valores dos sliders
    const priceRange = document.getElementById('price-range').noUiSlider.get();
    const minPrice = parseInt(priceRange[0]);
    const maxPrice = parseInt(priceRange[1]);
    
    const areaRange = document.getElementById('area-range').noUiSlider.get();
    const minArea = parseInt(areaRange[0]);
    const maxArea = parseInt(areaRange[1]);
    
    // Obtém as características selecionadas
    const selectedFeatures = [];
    document.querySelectorAll('input[name="features"]:checked').forEach(checkbox => {
        selectedFeatures.push(checkbox.value);
    });
    
    // Aplica os filtros
    filteredProperties = propertiesData.filter(property => {
        // Filtro por termo de busca
        if (searchTerm && !(
            property.title.toLowerCase().includes(searchTerm) ||
            property.address.toLowerCase().includes(searchTerm) ||
            property.features.some(f => f.includes(searchTerm))
        )) {
            return false;
        }
        
        // Filtro por tipo
        if (propertyType && property.type !== propertyType) {
            return false;
        }
        
        // Filtro por finalidade
        if (purpose && property.purpose !== purpose) {
            return false;
        }
        
        // Filtro por preço
        if (property.price < minPrice || property.price > maxPrice) {
            return false;
        }
        
        // Filtro por quartos
        if (bedrooms > 0 && property.bedrooms < bedrooms) {
            return false;
        }
        
        // Filtro por banheiros
        if (bathrooms > 0 && property.bathrooms < bathrooms) {
            return false;
        }
        
        // Filtro por vagas
        if (garage > 0 && property.garage < garage) {
            return false;
        }
        
        // Filtro por área
        if (property.area < minArea || property.area > maxArea) {
            return false;
        }
        
        // Filtro por características
        if (selectedFeatures.length > 0 && !selectedFeatures.every(f => property.features.includes(f))) {
            return false;
        }
        
        return true;
    });
    
    // Ordena os resultados
    sortProperties();
    
    // Renderiza os imóveis filtrados
    renderProperties();
}

// Ordena os imóveis com base no critério selecionado
function sortProperties() {
    const sortBy = document.getElementById('sort-by').value;
    
    filteredProperties.sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'area-asc':
                return a.area - b.area;
            case 'area-desc':
                return b.area - a.area;
            case 'recent':
            default:
                return new Date(b.createdAt) - new Date(a.createdAt);
        }
    });
}

// Renderiza os imóveis na página
function renderProperties() {
    const propertyGrid = document.getElementById('property-grid');
    propertyGrid.innerHTML = '';
    
    // Calcula os imóveis a serem exibidos na página atual
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const propertiesToShow = filteredProperties.slice(startIndex, endIndex);
    
    // Atualiza o contador de resultados
    document.getElementById('results-count').textContent = 
        `${filteredProperties.length} imóvel${filteredProperties.length !== 1 ? 's' : ''} encontrado${filteredProperties.length !== 1 ? 's' : ''}`;
    
    // Atualiza a paginação
    updatePagination();
    
    // Se não houver resultados, exibe uma mensagem
    if (propertiesToShow.length === 0) {
        propertyGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Nenhum imóvel encontrado com os filtros selecionados</p>
            </div>
        `;
        return;
    }
    
    // Renderiza cada imóvel
    propertiesToShow.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.className = 'property-card';
        propertyCard.innerHTML = `
            <img src="${property.image}" alt="${property.title}">
            <div class="property-card-content">
                <h3>${property.title}</h3>
                <p class="price">${property.purpose === 'venda' ? 'R$ ' + formatCurrency(property.price) : 'R$ ' + formatCurrency(property.price) + '/mês'}</p>
                <p class="address"><i class="fas fa-map-marker-alt"></i> ${property.address}</p>
                <div class="features">
                    <span class="feature"><i class="fas fa-bed"></i> ${property.bedrooms}</span>
                    <span class="feature"><i class="fas fa-bath"></i> ${property.bathrooms}</span>
                    <span class="feature"><i class="fas fa-car"></i> ${property.garage}</span>
                    <span class="feature"><i class="fas fa-ruler-combined"></i> ${property.area}m²</span>
                </div>
                <a href="imovel.html?id=${property.id}" class="btn">Ver Detalhes</a>
            </div>
        `;
        propertyGrid.appendChild(propertyCard);
    });
}

// Atualiza os controles de paginação
function updatePagination() {
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    
    document.getElementById('page-info').textContent = `Página ${currentPage} de ${totalPages}`;
    document.getElementById('prev-page').disabled = currentPage <= 1;
    document.getElementById('next-page').disabled = currentPage >= totalPages;
}

// Limpa todos os filtros
function resetFilters() {
    document.getElementById('search-form').reset();
    document.getElementById('price-range').noUiSlider.reset();
    document.getElementById('area-range').noUiSlider.reset();
    document.getElementById('sort-by').value = 'recent';
    
    filteredProperties = [...propertiesData];
    sortProperties();
    renderProperties();
}

// Formata valores monetários
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { 
        style: 'decimal', 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    }).format(value);
}
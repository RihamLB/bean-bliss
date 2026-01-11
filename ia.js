// ===== AI RECOGNITION SYSTEM - TENSORFLOW.JS =====

let model = null;
let imageElement = null;

// Dictionnaire de mapping des prédictions vers les boissons du café
const beverageMapping = {
    // Coffee types
    'espresso': { name: 'Espresso', type: 'hot', price: '11 DH', category: 'coffee' },
    'coffee': { name: 'Coffee', type: 'hot', price: '11 DH', category: 'coffee' },
    'cup': { name: 'Cappuccino', type: 'hot', price: '18 DH', category: 'coffee' },
    'coffee_mug': { name: 'Latte', type: 'hot', price: '13DH', category: 'coffee' },
    'latte': { name: 'Caffe Latte', type: 'hot', price: '16 DH', category: 'coffee' },
    'cappuccino': { name: 'Cappuccino', type: 'hot', price: '18 DH', category: 'coffee' },
    'mocha': { name: 'Mocha', type: 'hot', price: '23 DH', category: 'coffee' },
    
    // Cold drinks
    'iced_coffee': { name: 'Iced Coffee', type: 'cold', price: '25 DH', category: 'coffee' },
    'smoothie': { name: 'Smoothie', type: 'cold', price: '28 DH', category: 'smoothie' },
    'juice': { name: 'Fresh Juice', type: 'cold', price: '18 DH', category: 'juice' },
    
    // Desserts
    'chocolate': { name: 'Hot Chocolate', type: 'hot', price: '12 DH', category: 'chocolate' },
    'cookie': { name: 'Cookie', type: 'dessert', price: '12 DH', category: 'dessert' }
};

// Keywords pour détecter le type de boisson
const hotKeywords = ['coffee', 'espresso', 'cappuccino', 'latte', 'mocha', 'cup', 'mug', 'tea', 'hot'];
const coldKeywords = ['iced', 'cold', 'smoothie', 'juice', 'frozen', 'frappe'];
const dessertKeywords = ['cookie', 'cake', 'chocolate', 'brownie', 'pastry', 'dessert'];

// ===== CHARGEMENT DU MODÈLE =====
async function loadModel() {
    try {
        console.log('🤖 Loading TensorFlow.js MobileNet model...');
        showLoading();
        
        // Charger le modèle MobileNet pré-entraîné
        model = await mobilenet.load();
        
        console.log('✅ Model loaded successfully!');
        hideLoading();
        return model;
    } catch (error) {
        console.error('❌ Error loading model:', error);
        alert('Error loading AI model. Please refresh the page.');
        hideLoading();
    }
}

// ===== GESTION DU FICHIER =====
function setupImageUpload() {
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    
    // Click sur le bouton
    uploadBtn.addEventListener('click', () => {
        imageInput.click();
    });
    
    // Click sur la zone de drop
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });
    
    // Drag & Drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });
    
    // Selection de fichier
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });
}

// ===== TRAITEMENT DE L'IMAGE =====
function handleImageUpload(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        imageElement = document.getElementById('uploadedImage');
        imageElement.src = e.target.result;
        
        // Afficher la prévisualisation
        showPreview();
        
        // Afficher les infos de l'image
        displayImageInfo(file);
        
        // Lancer la reconnaissance après le chargement de l'image
        imageElement.onload = () => {
            classifyImage();
        };
    };
    
    reader.readAsDataURL(file);
}

// ===== AFFICHAGE DES INFOS IMAGE =====
function displayImageInfo(file) {
    const imageInfo = document.getElementById('imageInfo');
    const sizeKB = (file.size / 1024).toFixed(2);
    
    imageInfo.innerHTML = `
        <p><i class="fas fa-file-image"></i> ${file.name}</p>
        <p><i class="fas fa-weight"></i> ${sizeKB} KB</p>
        <p><i class="fas fa-file-alt"></i> ${file.type}</p>
    `;
}

// ===== CLASSIFICATION DE L'IMAGE =====
async function classifyImage() {
    if (!model) {
        await loadModel();
    }
    
    if (!imageElement) {
        return;
    }
    
    showLoading();
    hideResults();
    
    try {
        console.log('🔍 Classifying image...');
        
        // Classifier l'image avec le modèle MobileNet
        const predictions = await model.classify(imageElement);
        
        console.log('📊 Predictions:', predictions);
        
        // Afficher les résultats
        displayResults(predictions);
        
    } catch (error) {
        console.error('❌ Error classifying image:', error);
        alert('Error analyzing image. Please try another image.');
    } finally {
        hideLoading();
    }
}

// ===== AFFICHAGE DES RÉSULTATS =====
function displayResults(predictions) {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';
    
    // Trouver la meilleure correspondance avec nos boissons
    const bestMatch = findBestBeverageMatch(predictions);
    
    // Afficher la prédiction principale
    displayMainPrediction(bestMatch);
    
    // Afficher toutes les prédictions
    displayAllPredictions(predictions);
    
    // Détecter le type de boisson (hot/cold)
    const beverageType = detectBeverageType(predictions);
    displayBeverageType(beverageType);
    
    // Afficher les recommandations
    displayRecommendations(beverageType, bestMatch);
    
    // Smooth scroll vers les résultats
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== TROUVER LA MEILLEURE CORRESPONDANCE =====
function findBestBeverageMatch(predictions) {
    for (let pred of predictions) {
        const className = pred.className.toLowerCase();
        
        // Chercher une correspondance exacte
        for (let key in beverageMapping) {
            if (className.includes(key)) {
                return {
                    ...beverageMapping[key],
                    confidence: pred.probability,
                    originalClass: pred.className
                };
            }
        }
    }
    
    // Si aucune correspondance exacte, retourner la première prédiction
    return {
        name: predictions[0].className,
        type: 'unknown',
        price: '-',
        category: 'unknown',
        confidence: predictions[0].probability,
        originalClass: predictions[0].className
    };
}

// ===== AFFICHAGE DE LA PRÉDICTION PRINCIPALE =====
function displayMainPrediction(match) {
    const beverageName = document.getElementById('beverageName');
    const confidenceFill = document.getElementById('confidenceFill');
    const confidenceValue = document.getElementById('confidenceValue');
    
    const confidencePercent = (match.confidence * 100).toFixed(1);
    
    beverageName.textContent = match.name;
    confidenceFill.style.width = confidencePercent + '%';
    confidenceValue.textContent = confidencePercent + '%';
    
    // Animation de la barre de confiance
    setTimeout(() => {
        confidenceFill.style.width = confidencePercent + '%';
    }, 100);
}

// ===== AFFICHAGE DE TOUTES LES PRÉDICTIONS =====
function displayAllPredictions(predictions) {
    const predictionsList = document.getElementById('predictionsList');
    
    const top3 = predictions.slice(0, 3);
    
    predictionsList.innerHTML = top3.map((pred, index) => {
        const percent = (pred.probability * 100).toFixed(1);
        return `
            <div class="prediction-item">
                <span class="rank">#${index + 1}</span>
                <span class="pred-name">${pred.className}</span>
                <span class="pred-confidence">${percent}%</span>
            </div>
        `;
    }).join('');
}

// ===== DÉTECTER LE TYPE DE BOISSON =====
function detectBeverageType(predictions) {
    const allText = predictions.map(p => p.className.toLowerCase()).join(' ');
    
    const hasHot = hotKeywords.some(keyword => allText.includes(keyword));
    const hasCold = coldKeywords.some(keyword => allText.includes(keyword));
    const hasDessert = dessertKeywords.some(keyword => allText.includes(keyword));
    
    if (hasDessert) return 'dessert';
    if (hasCold) return 'cold';
    if (hasHot) return 'hot';
    
    return 'unknown';
}

// ===== AFFICHAGE DU TYPE DE BOISSON =====
function displayBeverageType(type) {
    const typeBadge = document.getElementById('typeBadge');
    const typeText = document.getElementById('typeText');
    
    const typeConfig = {
        'hot': { icon: 'fa-mug-hot', text: 'Hot Beverage', color: '#E74C3C' },
        'cold': { icon: 'fa-snowflake', text: 'Cold Beverage', color: '#3498DB' },
        'dessert': { icon: 'fa-cookie-bite', text: 'Dessert', color: '#D4AF37' },
        'unknown': { icon: 'fa-question', text: 'Unknown Type', color: '#95A5A6' }
    };
    
    const config = typeConfig[type];
    
    typeBadge.innerHTML = `
        <i class="fas ${config.icon}"></i>
        <span>${config.text}</span>
    `;
    typeBadge.style.background = config.color;
}

// ===== RECOMMANDATIONS =====
function displayRecommendations(type, match) {
    const recommendationsList = document.getElementById('recommendationsList');
    
    const recommendations = {
        'hot': [
            { name: 'Cappuccino', price: '18 DH', icon: 'fa-coffee' },
            { name: 'Caffe Latte', price: '16 DH', icon: 'fa-coffee' },
            { name: 'Mocha', price: '23 DH', icon: 'fa-coffee' }
        ],
        'cold': [
            { name: 'Iced Coffee', price: '25 DH', icon: 'fa-glass-whiskey' },
            { name: 'Smoothie', price: '18 DH', icon: 'fa-blender' },
            { name: 'Fresh Juice', price: '15 DH', icon: 'fa-lemon' }
        ],
        'dessert': [
            { name: 'Chocolate Cookie', price: '12 DH', icon: 'fa-cookie' },
            { name: 'Caramel Cookie', price: '12 DH', icon: 'fa-cookie-bite' },
            { name: 'Cookie Pack', price: '62 DH', icon: 'fa-box' }
        ],
        'unknown': [
            { name: 'Cappuccino', price: '18 DH', icon: 'fa-coffee' },
            { name: 'Signature Cookies', price: '15', icon: 'fa-cookie' }
        ]
    };
    
    const items = recommendations[type] || recommendations['unknown'];
    
    recommendationsList.innerHTML = items.map(item => `
        <div class="recommendation-item">
            <i class="fas ${item.icon}"></i>
            <div class="rec-info">
                <h5>${item.name}</h5>
                <span class="rec-price">${item.price}</span>
            </div>
            <a href="order.html" class="btn-small">Order</a>
        </div>
    `).join('');
}

// ===== GESTION DE L'AFFICHAGE =====
function showPreview() {
    document.getElementById('previewSection').style.display = 'block';
}

function showLoading() {
    document.getElementById('loadingSection').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loadingSection').style.display = 'none';
}

function hideResults() {
    document.getElementById('resultsSection').style.display = 'none';
}

// ===== BOUTON ANALYSER À NOUVEAU =====
function setupAnalyzeAgain() {
    const analyzeAgainBtn = document.getElementById('analyzeAgainBtn');
    
    analyzeAgainBtn.addEventListener('click', () => {
        document.getElementById('imageInput').value = '';
        document.getElementById('previewSection').style.display = 'none';
        hideResults();
        document.getElementById('uploadArea').scrollIntoView({ behavior: 'smooth' });
    });
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Initializing AI Recognition System...');
    
    setupImageUpload();
    setupAnalyzeAgain();
    
    // Pré-charger le modèle
    await loadModel();
    
    console.log('✅ AI Recognition System Ready!');
});
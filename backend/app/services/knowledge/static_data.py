# Auto-generated static seeding data file
from typing import Dict, Any, List, Tuple

CROP_PROFILES = {
    "Apple": {
        "description": "Apples (Malus domestica) are deciduous trees in the rose family, cultivated worldwide for their sweet pomaceous fruit. They thrive in temperate zones.",
        "soil": "Well-drained, loamy soil with a pH of 6.0 to 7.0.",
        "growing_temp": "15°C to 24°C (requires winter chilling hours to break bud dormancy).",
        "seasonal_care": "Winter: Pruning to shape tree. Spring: Apply nitrogen fertilizer. Summer: Thin fruit clusters. Autumn: Harvest and clear fallen leaves."
    },
    "Potato": {
        "description": "Potatoes (Solanum tuberosum) are starchy, tuberous crops from the nightshade family (Solanaceae). They are a critical global staple crop.",
        "soil": "Loose, well-aerated, sandy loam soil with a pH of 5.0 to 6.0.",
        "growing_temp": "15°C to 20°C (cool climates, tubers fail to form above 30°C).",
        "seasonal_care": "Spring: Plant seed tubers after frost. Summer: Hill soil around stems. Autumn: Harvest tubers once vines die back."
    },
    "Tomato": {
        "description": "Tomatoes (Solanum lycopersicum) are warm-season nightshade family crops. They are highly responsive to intensive watering and direct sunlight.",
        "soil": "Rich, fertile loam soil, heavily composted with a pH of 6.2 to 6.8.",
        "growing_temp": "21°C to 29°C (sensitive to frost and extreme heat).",
        "seasonal_care": "Spring: Transplant seedlings and install cages/stakes. Summer: Water consistently, prune suckers. Autumn: Harvest and clean crop residue."
    },
    "Grape": {
        "description": "Grapes (Vitis vinifera) are woody perennial vines grown for wine, juice, raisins, and table fruit. They require rigorous trellis support.",
        "soil": "Deep, gravelly, or sandy loam soil with excellent drainage and a pH of 6.0 to 6.5.",
        "growing_temp": "18°C to 32°C (requires high heat accumulation for sugar production).",
        "seasonal_care": "Winter: Heavy pruning (leaving only 10% of wood). Spring: Trellis training. Summer: Canopy management to expose fruit. Autumn: Harvest."
    },
    "Corn": {
        "description": "Corn/Maize (Zea mays) is a tall annual cereal grass grown for its edible ears of grain. It is a heavy feeder requiring high nitrogen inputs.",
        "soil": "Fertile, well-drained loam with high organic matter and a pH of 5.8 to 7.0.",
        "growing_temp": "20°C to 30°C (requires warm soil for seed germination).",
        "seasonal_care": "Spring: Plant seeds in blocks for wind pollination. Summer: Sidedress with nitrogen. Autumn: Harvest when husks turn dry and brown."
    },
    "Rice": {
        "description": "Rice (Oryza sativa) is a semi-aquatic grass grown as an annual. It is the primary staple food for over half of the world's population.",
        "soil": "Heavy clay or clayey loam that holds water well, with a pH of 5.5 to 6.5.",
        "growing_temp": "22°C to 35°C (requires humid, warm conditions).",
        "seasonal_care": "Spring: Establish nursery and flood paddies. Summer: Transplant seedlings into standing water. Autumn: Drain fields and harvest."
    }
}

DISEASE_PROFILES = {
    ("Apple", "Scab"): {
        "symptoms": "Olive-green to black velvety spots on leaves; leaves turn yellow and drop early; fruit develops corky brown lesions.",
        "causes": "Fungus Venturia inaequalis, which overwinters in dead leaves on the ground.",
        "spread": "Spores are released in spring during rainy periods and carried by wind.",
        "severity": "Medium-High",
        "prevention": "Rake and burn fallen leaves; prune trees to improve wind drying; apply fungicides before spring rains."
    },
    ("Apple", "Black Rot"): {
        "symptoms": "Frogeye leaf spots (purple margins with tan centers); sunken cankers on limbs; fruit turns black with concentric rings.",
        "causes": "Fungus Botryosphaeria obtusa, infecting injured tissue or dead wood.",
        "spread": "Rainwater splashing spores from cankers onto nearby leaves and fruit.",
        "severity": "High",
        "prevention": "Prune out dead wood and cankered branches; destroy mummified fruit hanging on the tree."
    },
    ("Apple", "Cedar Rust"): {
        "symptoms": "Bright orange-yellow spots on leaf upper surfaces; orange cup-like tubes cluster on leaf undersides; defoliation.",
        "causes": "Fungus Gymnosporangium juniperi-virginianae, requiring both apple and red cedar hosts.",
        "spread": "Windborne spores traveling between cedar galls and apple leaves.",
        "severity": "Medium",
        "prevention": "Remove nearby red cedars; spray preventative fungicides during spring bud break."
    },
    ("Apple", "Healthy"): {
        "symptoms": "No visible lesions, spots, or abnormal discoloration. Leaf is deep green and fully functional.",
        "causes": "Optimal nutrition, moisture, and absence of active pests or pathogens.",
        "spread": "N/A",
        "severity": "None",
        "prevention": "Continue standard seasonal maintenance, irrigation, and inspection."
    },
    ("Corn", "Common Rust"): {
        "symptoms": "Golden-brown powdery pustules on both upper and lower leaf surfaces; leaves yellow and dry.",
        "causes": "Fungus Puccinia sorghi.",
        "spread": "Windborne spores carried long distances from southern areas.",
        "severity": "Medium",
        "prevention": "Plant resistant hybrids; apply foliar fungicides if disease appears early in the season."
    },
    ("Corn", "Gray Leaf Spot"): {
        "symptoms": "Rectangular, tan-to-gray leaf spots bounded by leaf veins; can merge to cause large necrotic blights.",
        "causes": "Fungus Cercospora zeae-maydis, overwintering in corn residue.",
        "spread": "Wind and rain splashing spores from crop residue onto lower leaves.",
        "severity": "High",
        "prevention": "Rotate crops (avoid corn-after-corn); practice deep tillage to bury residue; plant resistant hybrids."
    },
    ("Corn", "Northern Leaf Blight"): {
        "symptoms": "Long, cigar-shaped, grayish-green or tan lesions; starts on lower leaves and progresses upward.",
        "causes": "Fungus Exserohilum turcicum.",
        "spread": "Spores produced in old lesions spread by wind.",
        "severity": "High",
        "prevention": "Utilize crop rotation; use resistant hybrids; spray fungicides at first sign of disease."
    },
    ("Corn", "Healthy"): {
        "symptoms": "Uniformly green leaves, erect stature, fully filled cobs, healthy silk development.",
        "causes": "Optimal nitrogen supply, proper soil drainage, and clean crop fields.",
        "prevention": "Monitor water supply; apply timely nitrogen sidedressing; keep fields weed-free."
    },
    ("Potato", "Early Blight"): {
        "symptoms": "Dark, concentric-ringed brown spots on older leaves ('target board' look); leaves yellow and die.",
        "causes": "Fungus Alternaria solani, persisting in soil and crop debris.",
        "spread": "Warm, humid conditions with alternating wet and dry periods enhance spore dispersal.",
        "severity": "Medium",
        "prevention": "Provide adequate nitrogen fertilization; rotate crops; avoid overhead sprinkler irrigation."
    },
    ("Potato", "Late Blight"): {
        "symptoms": "Dark, water-soaked leaf spots with white fuzzy mold growth on undersides in wet weather; rapid rotting.",
        "causes": "Oomycete pathogen Phytophthora infestans (famous for Irish Potato Famine).",
        "spread": "Extremely rapid under cool, wet conditions; wind can carry spores for miles.",
        "severity": "Critical",
        "prevention": "Use certified disease-free seed tubers; eliminate volunteer potato plants; apply protective fungicides."
    },
    ("Potato", "Healthy"): {
        "symptoms": "Lush green canopy, active flowering, tuber set forming underground, no spotting.",
        "causes": "Clean seed stock, well-drained acidic soil, and dry foliage conditions.",
        "prevention": "Hill plants regularly to protect tubers; avoid late-season nitrogen excess; harvest during dry weather."
    },
    ("Tomato", "Bacterial Spot"): {
        "symptoms": "Small, dark, water-soaked spots with yellow halos on leaves; spots can merge and cause defoliation.",
        "causes": "Bacterium Xanthomonas campestris, seed-borne or overwintering in debris.",
        "spread": "Splashing rain and working in wet fields spreads bacteria.",
        "severity": "Medium-High",
        "prevention": "Use pathogen-free seed; avoid overhead irrigation; apply copper-based sprays."
    },
    ("Tomato", "Early Blight"): {
        "symptoms": "Dark concentric-ringed target spots on older leaves; defoliation starts from the bottom up.",
        "causes": "Fungus Alternaria solani, soil-borne.",
        "spread": "Rain splashes and warm humid wind carry spores.",
        "severity": "Medium",
        "prevention": "Mulch crop base to prevent soil splash; prune lower leaves; rotate out of Solanaceous crops."
    },
    ("Tomato", "Late Blight"): {
        "symptoms": "Large, dark gray-green water-soaked lesions that rot rapidly; white fuzzy growth on leaf undersides.",
        "causes": "Oomycete Phytophthora infestans.",
        "spread": "Highly explosive in cool, damp weather via windborne sporangia.",
        "severity": "Critical",
        "prevention": "Plant resistant cultivars; prune for airflow; destroy infected plants immediately to prevent spread."
    },
    ("Tomato", "Leaf Mold"): {
        "symptoms": "Olive-green to gray velvety patch on lower leaf surfaces; yellow spots on upper surfaces.",
        "causes": "Fungus Passalora fulva, thriving in high humidity.",
        "spread": "Air currents and splashing water inside greenhouses.",
        "severity": "Medium",
        "prevention": "Maximize ventilation in greenhouses; maintain relative humidity below 85%; prune lower canopy."
    },
    ("Tomato", "Septoria Leaf Spot"): {
        "symptoms": "Numerous small, circular spots with dark margins and greyish-white centers containing tiny black specks.",
        "causes": "Fungus Septoria lycopersici.",
        "spread": "Spreads in wet, warm conditions via rain splash.",
        "severity": "High",
        "prevention": "Keep foliage dry; mulch soil; clean stakes and cages at end of season."
    },
    ("Tomato", "Spider Mites"): {
        "symptoms": "Fine yellow stippling or dotting on leaves; fine webbing on leaf undersides; leaves turn bronze and drop.",
        "causes": "Tetranychus urticae (Two-spotted spider mite), multiplying in hot, dry conditions.",
        "spread": "Mites crawl between plants or drift on silk threads (ballooning).",
        "severity": "Medium-High",
        "prevention": "Maintain adequate watering; release predatory mites; spray with insecticidal soap."
    },
    ("Tomato", "Target Spot"): {
        "symptoms": "Pitted lesions on fruit with dark concentric rings; dark brown concentric-ringed target spots on leaves.",
        "causes": "Fungus Corynespora cassiicola.",
        "spread": "High humidity and warm temperatures trigger spore release.",
        "severity": "Medium",
        "prevention": "Improve row spacing for airflow; spray preventative copper fungicides."
    },
    ("Tomato", "Yellow Leaf Curl Virus"): {
        "symptoms": "Severe stunting of plant; leaf margins curl upward and turn yellow; leaves are small and crumpled.",
        "causes": "Begomovirus (TYLCV), transmitted by whiteflies.",
        "spread": "Transmitted by feeding Silverleaf Whiteflies (Bemisia tabaci).",
        "severity": "Critical",
        "prevention": "Use whitefly-proof netting; control whiteflies with neem oil; remove weed hosts."
    },
    ("Tomato", "Mosaic Virus"): {
        "symptoms": "Mottled light and dark green patterns on leaves; distorted, narrow, 'shoestring' leaves.",
        "causes": "Tobacco Mosaic Virus (TMV) or Tomato Mosaic Virus (ToMV).",
        "spread": "Extremely stable; spreads via touch, tools, hands, or crop debris.",
        "severity": "High",
        "prevention": "Wash hands with soap before handling plants; disinfect tools; plant resistant seed varieties."
    },
    ("Tomato", "Healthy"): {
        "symptoms": "Vigorous green vine growth, bright yellow flowers, smooth round fruit sets, firm leaves.",
        "causes": "Well-balanced fertilization (NPK + Calcium), consistent soil moisture.",
        "prevention": "Mulch the root zone; monitor for early signs of pests; prune lower foliage."
    },
    ("Grape", "Black Rot"): {
        "symptoms": "Reddish-brown circular spots on leaves with tiny black dots; berries shrivel into hard, black mummies.",
        "causes": "Fungus Guignardia bidwellii.",
        "spread": "Spring rains release spores from overwintered berry mummies.",
        "severity": "High",
        "prevention": "Prune and destroy all mummified fruit; apply preventative fungicides from bud break through bloom."
    },
    ("Grape", "Esca (Black Measles)"): {
        "symptoms": "Tiger-striping on leaves (yellow/red stripes between veins); dark purple spots on fruit skin.",
        "causes": "Complex of wood-rotting fungi (Phaeomoniella, Phaeoacremonium).",
        "spread": "Fungi enter through pruning wounds during wet winter periods.",
        "severity": "High",
        "prevention": "Protect pruning wounds with pastes/sealants; prune late in winter when spore counts are low."
    },
    ("Grape", "Leaf Blight"): {
        "symptoms": "Irregular dark brown patches on leaf margins; leaves dry, curl, and fall prematurely.",
        "causes": "Fungus Pseudocercospora vitis.",
        "spread": "Wet canopy conditions allow fungal spores to multiply and spread.",
        "severity": "Medium",
        "prevention": "Thin canopy to increase sun exposure and dry leaves quickly."
    },
    ("Grape", "Healthy"): {
        "symptoms": "Bright green leaves, clean fruit clusters, strong cane growth, no shriveling.",
        "causes": "Airy trellis system, balanced pruning, proper soil drainage.",
        "prevention": "Ensure good canopy sun exposure; monitor soil moisture levels."
    },
    ("Rice", "Brown Spot"): {
        "symptoms": "Oval, brown spots with yellow halos across leaves; spots look like sesame seeds; grains turn brown.",
        "causes": "Fungus Cochliobolus miyabeanus, often associated with nutrient-deficient soil.",
        "spread": "Airborne spores released during high relative humidity.",
        "severity": "Medium-High",
        "prevention": "Apply silicon and potash fertilizers; manage irrigation; use certified clean seed."
    },
    ("Rice", "Hispa"): {
        "symptoms": "Parallel white streaks on leaves along veins; leaves wither and dry, appearing bleached.",
        "causes": "Dicladispa armigera (Rice Hispa beetle), whose larvae mine inside leaf layers.",
        "spread": "Beetle migrations from surrounding grasses or stubble.",
        "severity": "Medium",
        "prevention": "Avoid excess nitrogen; sweep fields with handnets to catch beetles; prune leaf tips before transplanting."
    },
    ("Rice", "Leaf Blast"): {
        "symptoms": "Spindle-shaped, diamond-like lesions with grey centers and brown borders on leaves; nodes rot.",
        "causes": "Fungus Magnaporthe oryzae, highly destructive to rice paddies.",
        "spread": "Explosive spore release under high humidity, warm nights, and leaf wetness.",
        "severity": "High-Critical",
        "prevention": "Avoid excessive nitrogen; regulate water depth; plant resistant varieties; apply triazole fungicides."
    },
    ("Rice", "Healthy"): {
        "symptoms": "Sturdy green culms, bright green leaves, fully filled panicles, even growth.",
        "causes": "Good field aeration, balanced NPK application, continuous shallow flooding.",
        "prevention": "Maintain weed control; execute dry-fallow crop rotations; apply silicate."
    }
}

TREATMENT_PROFILES = {
    ("Apple", "Scab"): {
        "organic": [
            "Apply sulfur or liquid copper fungicides during the green-tip and pink-bud stages.",
            "Use neem oil to coat leaves and prevent spore germination.",
            "Rake and compost dead leaves with lime to speed up decomposition."
        ],
        "chemical": [
            "Spray protective contact fungicides containing Captan or Mancozeb from bud break through petal fall.",
            "Use systemic fungicides like Myclobutanil or Fenbuconazole if scab is already active."
        ]
    },
    ("Apple", "Black Rot"): {
        "organic": [
            "Prune out limb cankers, cutting 15cm below the visible margin, during dry winter weather.",
            "Apply copper-octanoate sprays during early bud break."
        ],
        "chemical": [
            "Apply Captan or thiophanate-methyl fungicides during warm, wet spring periods."
        ]
    },
    ("Apple", "Cedar Rust"): {
        "organic": [
            "Spray copper or sulfur fungicides at 7-10 day intervals starting at blossom bud break.",
            "Prune out galls on nearby red cedar trees."
        ],
        "chemical": [
            "Use Myclobutanil (Rally) or Mancozeb sprays at tight cluster to petal fall stages."
        ]
    },
    ("Apple", "Healthy"): {
        "organic": [
            "Apply well-rotted organic compost around the tree drip line in early spring.",
            "Ensure regular irrigation and maintain organic mulch to preserve root moisture."
        ],
        "chemical": [
            "No chemical treatments required. Implement a routine mineral foliar spray if soil tests indicate deficiencies."
        ]
    },
    ("Corn", "Common Rust"): {
        "organic": [
            "Apply sulfur dust early if spots are noticed on lower leaves.",
            "Use compost tea to boost plant immune defense."
        ],
        "chemical": [
            "Foliar spray with Strobilurin or Triazole class fungicides (e.g. Pyraclostrobin, Tebuconazole) if infection exceeds 10% canopy."
        ]
    },
    ("Corn", "Gray Leaf Spot"): {
        "organic": [
            "Practice crop rotation with soybeans to break the Cercospora lifecycle.",
            "Till the soil after harvest to bury infected residue, hastening decay."
        ],
        "chemical": [
            "Apply Azoxystrobin, Propiconazole, or Tebuconazole fungicides at tasseling stage (VT to R1)."
        ]
    },
    ("Corn", "Northern Leaf Blight"): {
        "organic": [
            "Rotate crops for at least 1-2 years.",
            "Practice deep fall plowing to destroy fungal spores in corn stalks."
        ],
        "chemical": [
            "Apply Strobilurin-Triazole mixtures (e.g., Trivapro, Delaro) when lesions first appear on lower canopy."
        ]
    },
    ("Corn", "Healthy"): {
        "organic": [
            "Apply organic nitrogen sources like alfalfa meal or poultry manure pre-planting.",
            "Maintain soil organic matter through cover cropping."
        ],
        "chemical": [
            "Apply starter fertilizer containing balanced NPK to promote early root growth."
        ]
    },
    ("Potato", "Early Blight"): {
        "organic": [
            "Spray copper-based organic fungicides at 7-14 day intervals.",
            "Apply organic mulch to prevent soil splashing onto bottom leaves."
        ],
        "chemical": [
            "Use protective chlorothalonil or mancozeb sprays.",
            "Apply systemic Boscalid or Azoxystrobin when target spots are first detected."
        ]
    },
    ("Potato", "Late Blight"): {
        "organic": [
            "Spray copper hydroxide fungicides immediately at the first sign of regional blight.",
            "Pull and destroy infected plants (bury them 60cm deep or bag and trash them)."
        ],
        "chemical": [
            "Apply high-efficacy fungicides like Fluopicolide, Mandipropamid, or Cyazofamid.",
            "Rotate fungicide chemical classes to prevent resistance development."
        ]
    },
    ("Potato", "Healthy"): {
        "organic": [
            "Soil-incorporate high-quality compost or fish emulsion.",
            "Use cover crops like rye or clover to improve soil structure."
        ],
        "chemical": [
            "Apply macro and micronutrients based on seasonal soil tests."
        ]
    },
    ("Tomato", "Bacterial Spot"): {
        "organic": [
            "Spray copper hydroxide or copper octanoate mixed with double-strengthened compost tea.",
            "Apply beneficial bio-fungicides containing Bacillus subtilis."
        ],
        "chemical": [
            "Spray copper-mancozeb tank mixtures (copper resistance in bacteria is common; mancozeb makes copper more effective)."
        ]
    },
    ("Tomato", "Early Blight"): {
        "organic": [
            "Mulch crop base with straw or plastic; prune bottom 30cm of leaves once plant matures.",
            "Spray copper fungicides or bio-fungicides (Bacillus amyloliquefaciens)."
        ],
        "chemical": [
            "Spray Chlorothalonil, Mancozeb, or Difenoconazole at the first sign of concentric spots."
        ]
    },
    ("Tomato", "Late Blight"): {
        "organic": [
            "Apply copper-based sprays preventatively.",
            "Quickly bag and remove infected vines. Do not compost late blight debris."
        ],
        "chemical": [
            "Apply Chlorothalonil or Mancozeb preventatively; apply systemic metalaxyl-m or propamocarb for active outbreaks."
        ]
    },
    ("Tomato", "Leaf Mold"): {
        "organic": [
            "Maximize greenhouse venting; use horizontal airflow fans.",
            "Spray potassium bicarbonate or neem oil on leaf undersides."
        ],
        "chemical": [
            "Spray Difenoconazole, Azoxystrobin, or Chlorothalonil to manage humidity-driven outbreaks."
        ]
    },
    ("Tomato", "Septoria Leaf Spot"): {
        "organic": [
            "Mulch thoroughly; avoid watering from above (use drip tape).",
            "Apply copper-octanoate or sulfur-based biofungicides."
        ],
        "chemical": [
            "Apply Chlorothalonil, Mancozeb, or Azoxystrobin at 7-10 day intervals in rainy summer weather."
        ]
    },
    ("Tomato", "Spider Mites"): {
        "organic": [
            "Introduce predatory mites (Phytoseiulus persimilis).",
            "Spray with rosemary oil extracts, insecticidal soaps, or neem oil."
        ],
        "chemical": [
            "Apply miticides like Abamectin, Spiromesifen, or Bifenazate (ensure under-leaf coverage)."
        ]
    },
    ("Tomato", "Target Spot"): {
        "organic": [
            "Improve plant spacing to allow leaves to dry rapidly after rain.",
            "Spray copper-based fungicides at first symptom."
        ],
        "chemical": [
            "Spray Azoxystrobin, Pyraclostrobin, or Chlorothalonil."
        ]
    },
    ("Tomato", "Yellow Leaf Curl Virus"): {
        "organic": [
            "Use yellow sticky traps to catch whiteflies.",
            "Spray insecticidal soaps, neem oil, or horticultural oils to suppress whitefly vectors."
        ],
        "chemical": [
            "Spray systemic insecticides like Imidacloprid, Acetamiprid, or Dinotefuran to control whitefly populations."
        ]
    },
    ("Tomato", "Mosaic Virus"): {
        "organic": [
            "There are no organic treatments for viral infections. Pull and burn infected plants.",
            "Soak tools in a 20% non-fat dry milk solution or 10% bleach to prevent mechanical transfer."
        ],
        "chemical": [
            "No chemical cure exists for plant viruses. Control weeds that harbor the virus."
        ]
    },
    ("Tomato", "Healthy"): {
        "organic": [
            "Water deeply twice a week at the root zone.",
            "Apply organic tomato-specific fertilizer (high in phosphorus and calcium to prevent blossom end rot)."
        ],
        "chemical": [
            "Apply calcium nitrate if leaf tip burn or blossom-end rot indicators appear."
        ]
    },
    ("Grape", "Black Rot"): {
        "organic": [
            "Remove all mummified berries from vines and ground; bury or burn them.",
            "Apply copper or lime-sulfur sprays during early spring before vines bloom."
        ],
        "chemical": [
            "Use Mancozeb, Ziram, or Myclobutanil fungicides starting at bud break until 4 weeks post-bloom."
        ]
    },
    ("Grape", "Esca (Black Measles)"): {
        "organic": [
            "Paint winter pruning wounds with organic pine tar or biodynamic pastes.",
            "Prune vines in dry weather only; disinfect shears between vines."
        ],
        "chemical": [
            "Apply wound protectant fungicides containing Thiophanate-methyl or Myclobutanil immediately after pruning cuts."
        ]
    },
    ("Grape", "Leaf Blight"): {
        "organic": [
            "Apply copper-octanoate or sulfur-based sprays.",
            "Remove lower leaves to ensure plenty of sun hits the soil under the trellis."
        ],
        "chemical": [
            "Spray Mancozeb or Strobilurin (e.g. Pyraclostrobin) at first spot detection."
        ]
    },
    ("Grape", "Healthy"): {
        "organic": [
            "Mulch vines with straw or woodchips; apply organic potash.",
            "Maintain clean canopy through leaf pulling."
        ],
        "chemical": [
            "Apply a foliar zinc/boron micro-nutrient spray post-harvest if needed."
        ]
    },
    ("Rice", "Brown Spot"): {
        "organic": [
            "Incorporate manure and organic crop residues to improve poor soils.",
            "Seed soaking in hot water (52°C for 10 min) to disinfect seed-borne spores."
        ],
        "chemical": [
            "Apply Potassium oxide (Potash) fertilizer to soil.",
            "Spray Propiconazole, Carbendazim, or Mancozeb if disease covers leaf sheath."
        ]
    },
    ("Rice", "Hispa"): {
        "organic": [
            "Manual clip leaf tips (where Hispa lay eggs) before transplanting.",
            "Spray neem seed kernel extract (NSKE 5%) to repel adult beetles."
        ],
        "chemical": [
            "Apply insecticides like Chlorpyrifos, Quinalphos, or Fipronil if beetle counts exceed 1 adult per hill."
        ]
    },
    ("Rice", "Leaf Blast"): {
        "organic": [
            "Avoid flooding fields too deeply; practice alternate wetting and drying.",
            "Use bio-control agents like Pseudomonas fluorescens seed treatment."
        ],
        "chemical": [
            "Apply Triazole or Strobilurin fungicides (e.g., Tricyclazole, Azoxystrobin) at first lesion detection."
        ]
    },
    ("Rice", "Healthy"): {
        "organic": [
            "Apply composted farmyard manure during field preparation.",
            "Practice green manuring (e.g. planting Sesbania)."
        ],
        "chemical": [
            "Apply balanced nitrogen-phosphate-potash (NPK) according to soil test recommendations."
        ]
    }
}

RECOMMENDATION_PROFILES = {
    ("Apple", "Scab"): {
        "fertilizer": "Avoid excess nitrogen (which causes tender, susceptible leaf flushes). Apply Calcium sprays to strengthen leaf cell walls.",
        "soil_moisture": "Irrigate at the ground level using drip lines. Avoid overhead sprinklers to keep foliage dry.",
        "action_items": [
            "Prune inner branches to maximize sun and air penetration.",
            "Shred or bury fallen leaves under the canopy with urea sprays to accelerate leaf decomposition."
        ]
    },
    ("Apple", "Black Rot"): {
        "fertilizer": "Maintain balanced NPK fertilization. Ensure potassium levels are adequate to aid cell repair.",
        "soil_moisture": "Avoid watering in late evening; prune surrounding weeds to reduce humidity under trees.",
        "action_items": [
            "Remove all mummified fruit from trees and ground.",
            "Clean and sanitize pruning shears with 70% alcohol between cuts."
        ]
    },
    ("Apple", "Cedar Rust"): {
        "fertilizer": "Apply balanced organic fertilizer. Avoid excessive nitrogen during spring spore periods.",
        "soil_moisture": "Drip irrigation is preferred; keep leaves dry.",
        "action_items": [
            "Inspect cedar trees within a 1km radius and prune out cedar galls (orange gelatinous horns) in wet spring."
        ]
    },
    ("Apple", "Healthy"): {
        "fertilizer": "Apply slow-release organic NPK (e.g. 5-3-4) in early spring. Supplement with boron if soil analysis suggests need.",
        "soil_moisture": "Provide 2.5 - 5 cm of water weekly (increase to 7.5 cm during fruit fill).",
        "action_items": [
            "Maintain a 7-10 cm layer of wood chip mulch around the base (keep mulch 15 cm away from the trunk).",
            "Monitor tree canopy for early signs of leaf rollers or aphids."
        ]
    },
    ("Corn", "Common Rust"): {
        "fertilizer": "Apply balanced fertilizer. Avoid excessive nitrogen which encourages fungal vegetative growth.",
        "soil_moisture": "Ensure good drainage. Soil compaction creates damp microclimates.",
        "action_items": [
            "Harvest corn early if rust starts moving onto ears.",
            "Destroy crop residue immediately after harvest."
        ]
    },
    ("Corn", "Gray Leaf Spot"): {
        "fertilizer": "Ensure sufficient potassium (K) fertilization, which directly improves stalk strength and leaf resistance.",
        "soil_moisture": "Irrigate in early morning to allow leaves to dry fully in daytime sun.",
        "action_items": [
            "Rotate fields with non-host crops like alfalfa, soybeans, or wheat.",
            "Practise conservation tillage to hasten old corn stalk breakdown."
        ]
    },
    ("Corn", "Northern Leaf Blight"): {
        "fertilizer": "Apply nitrogen in split applications. Ensure phosphorus levels are high to promote early growth.",
        "soil_moisture": "Avoid waterlogging; maintain clear drainage ditches.",
        "action_items": [
            "Plant resistant crop hybrids carrying Ht genes.",
            "Practice deep plowing post-harvest to bury residue."
        ]
    },
    ("Corn", "Healthy"): {
        "fertilizer": "Apply nitrogen sidedressing at V4-V6 stages. Ensure zinc levels are balanced.",
        "soil_moisture": "Keep soil moist during tasseling and silking (critical water demand periods).",
        "action_items": [
            "Execute plant population counts to optimize row spacing.",
            "Check ear development and kernel fill uniformity."
        ]
    },
    ("Potato", "Early Blight"): {
        "fertilizer": "Adequate nitrogen (N) and potassium (K) are critical. Under-fertilized, stressed potato plants are highly susceptible.",
        "soil_moisture": "Maintain uniform soil moisture. Avoid alternating drought and flooding.",
        "action_items": [
            "Prune lower leaves that contact the soil surface.",
            "Harvest only in dry weather to prevent tuber infection."
        ]
    },
    ("Potato", "Late Blight"): {
        "fertilizer": "Ensure high potassium (K) and phosphorus (P) levels. Avoid late-season nitrogen applications.",
        "soil_moisture": "Stop irrigation if late blight is detected nearby. Protect tubers from wet soil contact.",
        "action_items": [
            "Destroy all volunteer potato plants that sprout in spring.",
            "Kill potato vines 2 weeks before harvest to allow skins to toughen, preventing tuber infection."
        ]
    },
    ("Potato", "Healthy"): {
        "fertilizer": "Apply balanced potato fertilizer (e.g. 10-20-20) at planting. Top dress with ammonium sulfate.",
        "soil_moisture": "Keep soil consistently moist (60-80% field capacity) from tuber initiation to harvest.",
        "action_items": [
            "Hill soil around potato stems to prevent greening of developing tubers.",
            "Verify tuber skin thickness before harvest."
        ]
    },
    ("Tomato", "Bacterial Spot"): {
        "fertilizer": "Avoid high-nitrogen liquid feeds. Apply calcium and potassium to enhance bacterial resistance.",
        "soil_moisture": "Drip irrigation is mandatory. Water early in the morning.",
        "action_items": [
            "Discard infected seedlings immediately. Sanitise seedling trays.",
            "Avoid pruning or harvesting when leaves are wet from dew or rain."
        ]
    },
    ("Tomato", "Early Blight"): {
        "fertilizer": "Feed with high-potassium tomato fertilizer. Avoid over-applying nitrogen.",
        "soil_moisture": "Apply 5cm of straw mulch around plants to isolate soil spores.",
        "action_items": [
            "Remove lower suckers and bottom leaves up to 30cm high.",
            "Clean stakes and cages with a bleach solution."
        ]
    },
    ("Tomato", "Late Blight"): {
        "fertilizer": "Apply balanced organic kelp meal. Do not use nitrogen-heavy synthetic fertilizers.",
        "soil_moisture": "Keep humidity low in greenhouses. Use drip tape only.",
        "action_items": [
            "Monitor local agricultural alerts for late blight warnings.",
            "Immediately bag and remove infected plants (do not compost or burn them on breezy days)."
        ]
    },
    ("Tomato", "Leaf Mold"): {
        "fertilizer": "Apply fertilizer containing trace magnesium and calcium. Maintain potassium levels.",
        "soil_moisture": "Water at base; venting greenhouse is crucial.",
        "action_items": [
            "Increase plant spacing to at least 60cm.",
            "Prune internal canopy leaves to create air paths."
        ]
    },
    ("Tomato", "Septoria Leaf Spot"): {
        "fertilizer": "Apply high-potassium organic fertilizer. Ensure calcium is present.",
        "soil_moisture": "Do not overhead water. Soil splash is the main vector.",
        "action_items": [
            "Apply straw or red plastic mulch immediately after transplanting.",
            "Prune infected bottom leaves early before the fungus moves up."
        ]
    },
    ("Tomato", "Spider Mites"): {
        "fertilizer": "Avoid excess nitrogen (which creates sugary sap that mites love). Apply potassium.",
        "soil_moisture": "Spray foliage occasionally with a strong blast of water (early morning) to knock off mites.",
        "action_items": [
            "Remove weeds around the garden borders (which act as mite reservoirs).",
            "Apply neem oil or insecticidal soap on undersides of leaves."
        ]
    },
    ("Tomato", "Target Spot"): {
        "fertilizer": "Maintain balanced NPK nutrition. Calcium deficiency makes leaves more susceptible.",
        "soil_moisture": "Mulch root zones; water early to ensure drying before nightfall.",
        "action_items": [
            "Stake plants to keep leaves off the ground.",
            "Clean and sanitize all tomato cages before storage."
        ]
    },
    ("Tomato", "Yellow Leaf Curl Virus"): {
        "fertilizer": "Apply trace mineral sprays to support plant vitality. Maintain balanced potassium.",
        "soil_moisture": "Keep soil moist to reduce stress; drought-stressed plants succumb faster to TYLCV.",
        "action_items": [
            "Install insect-proof screen barriers in greenhouses.",
            "Immediately pull and bag virus-infected plants."
        ]
    },
    ("Tomato", "Mosaic Virus"): {
        "fertilizer": "No fertilizer changes will cure mosaic virus. Maintain balanced organic inputs.",
        "soil_moisture": "Maintain normal irrigation.",
        "action_items": [
            "Do not smoke or handle tobacco near tomato plants.",
            "Disinfect hands and tools with milk or soap before touching healthy plants."
        ]
    },
    ("Tomato", "Healthy"): {
        "fertilizer": "Apply organic fertilizer containing Calcium (e.g. bone meal) at transplanting. Top-dress with compost.",
        "soil_moisture": "Provide 2.5-3.5 cm of water weekly. Maintain consistent moisture to prevent blossom end rot.",
        "action_items": [
            "Prune lower suckers (stems growing in the leaf crotches) to focus energy on main fruit branches.",
            "Stake and tie vines to support heavy fruit load."
        ]
    },
    ("Grape", "Black Rot"): {
        "fertilizer": "Maintain balanced grape-specific fertilizer. Excess nitrogen creates dense canopy shading.",
        "soil_moisture": "Select trellis locations with full day sun and good air drainage.",
        "action_items": [
            "Prune vines in winter to open up canopy.",
            "Remove all wild grapevines within 100 meters of the vineyard."
        ]
    },
    ("Grape", "Esca (Black Measles)"): {
        "fertilizer": "Incorporate well-rotted compost. Avoid synthetic high-nitrogen inputs.",
        "soil_moisture": "Ensure deep root watering; avoid soggy soil near vine trunk base.",
        "action_items": [
            "Mark infected vines in summer and prune them last in winter to avoid spreading fungi.",
            "Sanitize pruning cuts with copper pastes."
        ]
    },
    ("Grape", "Leaf Blight"): {
        "fertilizer": "Apply organic potash. Avoid excessive nitrogen.",
        "soil_moisture": "Thin canopy shoots in early summer to ensure rapid drying after rain.",
        "action_items": [
            "Harvest grape clusters on time.",
            "Clear out old leaf clutter under the trellis."
        ]
    },
    ("Grape", "Healthy"): {
        "fertilizer": "Apply well-balanced grape fertilizer in early spring. Add organic magnesium sulfate (epsom salts).",
        "soil_moisture": "Deep-water vines every 2-3 weeks (grapes have deep root systems).",
        "action_items": [
            "Perform shoot thinning and leaf pulling around grape clusters to expose them to morning sun.",
            "Verify grape sugar levels (Brix) before harvest."
        ]
    },
    ("Rice", "Brown Spot"): {
        "fertilizer": "Apply Potassium (K) fertilizer. Brown spot is an indicator of potassium-starved soils.",
        "soil_moisture": "Manage water levels: avoid leaving fields dry or poorly drained.",
        "action_items": [
            "Analyze soil for potassium, silicon, and zinc deficiencies.",
            "Practice crop rotation with green manure crops."
        ]
    },
    ("Rice", "Hispa"): {
        "fertilizer": "Avoid excess nitrogen (which makes leaves tender, attractive, and nutritious for beetles).",
        "soil_moisture": "Maintain shallow flooding levels (Hispa activity is higher in deep water paddies).",
        "action_items": [
            "Clip leaf tips from seedlings before transplanting to destroy Hispa eggs.",
            "Rake and burn stubble after harvesting."
        ]
    },
    ("Rice", "Leaf Blast"): {
        "fertilizer": "Strictly limit nitrogen (excess nitrogen dramatically increases blast susceptibility). Apply Silicon (Si) fertilizer to toughen leaf cell walls.",
        "soil_moisture": "Maintain continuous shallow flooding. Draining fields triggers blast development.",
        "action_items": [
            "Destroy infected straw and stubble from previous crops.",
            "Avoid late transplanting and use blast-resistant rice varieties."
        ]
    },
    ("Rice", "Healthy"): {
        "fertilizer": "Apply nitrogen in split doses: pre-planting, tillering, and panicle initiation. Apply potassium.",
        "soil_moisture": "Keep water levels at 2-5 cm during vegetative and reproductive stages.",
        "action_items": [
            "Control water weeds regularly.",
            "Execute panicle checks to monitor flowering."
        ]
    }
}


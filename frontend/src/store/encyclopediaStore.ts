import { create } from 'zustand'

export interface EncyclopediaCrop {
  name: string
  scientificName: string
  description: string
  soilRequirements: string
  temperatureRange: string
  seasonalCare: string
  diseases: { name: string; symptoms: string; severity: string }[]
}

interface EncyclopediaState {
  crops: EncyclopediaCrop[]
}

const encyclopediaCrops: EncyclopediaCrop[] = [
  {
    name: 'Apple',
    scientificName: 'Malus domestica',
    description: 'Deciduous trees famous for their sweet pomaceous fruit. Grown in temperate orchards worldwide.',
    soilRequirements: 'Well-drained loam with a pH of 6.0 to 7.0.',
    temperatureRange: '15°C to 24°C',
    seasonalCare: 'Winter: Pruning dead limbs. Spring: Apply nitrogen compost. Summer: Fruit cluster thinning. Autumn: Harves and leaf clearing.',
    diseases: [
      { name: 'Scab', symptoms: 'Olive-green/black velvety spots on leaves; brown lesions on fruit.', severity: 'Medium-High' },
      { name: 'Black Rot', symptoms: 'Purple leaf rings, limb cankers, mummified black fruit.', severity: 'High' },
      { name: 'Cedar Rust', symptoms: 'Bright orange spots on upper leaf surface, spore tubes on undersides.', severity: 'Medium' }
    ]
  },
  {
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    description: 'Starchy tuberous root crop. Essential global food source, highly sensitive to soil dampness.',
    soilRequirements: 'Loose, well-aerated sandy loam with a pH of 5.0 to 6.0.',
    temperatureRange: '15°C to 20°C',
    seasonalCare: 'Spring: Planting seed tubers. Summer: Hill soil around growing stems. Autumn: Harvest when vines dry.',
    diseases: [
      { name: 'Early Blight', symptoms: 'Target-like concentric ring brown spots on older leaves.', severity: 'Medium' },
      { name: 'Late Blight', symptoms: 'Water-soaked dark lesions, white fuzz on undersides, rapid rot.', severity: 'Critical' }
    ]
  },
  {
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    description: 'Highly popular warm-season crop. Highly susceptible to leaf fungi and viral whitefly vectors.',
    soilRequirements: 'Rich, organic-heavy composted loam with a pH of 6.2 to 6.8.',
    temperatureRange: '21°C to 29°C',
    seasonalCare: 'Spring: Transplanting and caging. Summer: Prune suckers, water deeply at ground level. Autumn: Debris cleaning.',
    diseases: [
      { name: 'Bacterial Spot', symptoms: 'Small water-soaked dark spots with yellow halos.', severity: 'Medium-High' },
      { name: 'Early Blight', symptoms: 'Bottom-up concentric ring spots and yellowing.', severity: 'Medium' },
      { name: 'Late Blight', symptoms: 'Explosive rot, greasy gray spots, fuzzy mold.', severity: 'Critical' },
      { name: 'Leaf Mold', symptoms: 'Olive-green velvety mold on under-leaves, yellow patches on tops.', severity: 'Medium' },
      { name: 'Septoria Leaf Spot', symptoms: 'Circular spots with dark margins and grey centers with tiny black specks.', severity: 'High' },
      { name: 'Spider Mites', symptoms: 'Fine yellow leaf stippling, silk webs on undersides.', severity: 'Medium-High' },
      { name: 'Target Spot', symptoms: 'Concentric ring brown lesions on both leaves and fruit.', severity: 'Medium' },
      { name: 'Yellow Leaf Curl Virus', symptoms: 'Severe stunting, upward-curling small yellow leaves.', severity: 'Critical' },
      { name: 'Mosaic Virus', symptoms: 'Mottled light/dark mosaic leaf patterns, shoestring leaves.', severity: 'High' }
    ]
  },
  {
    name: 'Grape',
    scientificName: 'Vitis vinifera',
    description: 'Perennial woody climbing vines. Requires strong trellising and intense canopy sun exposure.',
    soilRequirements: 'Gravelly or sandy soils with superb drainage. pH of 6.0 to 6.5.',
    temperatureRange: '18°C to 32°C',
    seasonalCare: 'Winter: Heavy cane pruning. Spring: Shoot training. Summer: Leaf pulling for airflow. Autumn: Sugar checking and harvest.',
    diseases: [
      { name: 'Black Rot', symptoms: 'Red-brown leaf spots with black points, shriveled black berry mummies.', severity: 'High' },
      { name: 'Esca (Black Measles)', symptoms: 'Tiger-stripe leaf discoloration, small purple fruit spots.', severity: 'High' },
      { name: 'Leaf Blight', symptoms: 'Irregular brown patches on margins, premature defoliation.', severity: 'Medium' }
    ]
  },
  {
    name: 'Corn',
    scientificName: 'Zea mays',
    description: 'Tall annual grass producing sweet ears. Heavy nitrogen consumer requiring wind-block layout.',
    soilRequirements: 'Fertile loam with high nitrogen content and a pH of 5.8 to 7.0.',
    temperatureRange: '20°C to 30°C',
    seasonalCare: 'Spring: Planting in blocks. Summer: Nitrogen sidedressing. Autumn: Harvest when ear husks turn brown.',
    diseases: [
      { name: 'Common Rust', symptoms: 'Powdery cinnamon-brown pustules on both leaf sides.', severity: 'Medium' },
      { name: 'Gray Leaf Spot', symptoms: 'Rectangular tan spots bounded by leaf veins.', severity: 'High' },
      { name: 'Northern Leaf Blight', symptoms: 'Long, cigar-shaped tan lesions spreading upwards.', severity: 'High' }
    ]
  },
  {
    name: 'Rice',
    scientificName: 'Oryza sativa',
    description: 'Semi-aquatic cereal grass. Principal staple crop for over half of global population.',
    soilRequirements: 'Heavy water-retaining clay loam with a pH of 5.5 to 6.5.',
    temperatureRange: '22°C to 35°C',
    seasonalCare: 'Spring: Nursery bed preparation. Summer: Seedling transplantation, flooding. Autumn: Field draining, harvesting.',
    diseases: [
      { name: 'Brown Spot', symptoms: 'Sesame-seed-like brown spots with yellow halos across leaves.', severity: 'Medium-High' },
      { name: 'Hispa', symptoms: 'Bleached white lines along leaf veins created by larvae mining.', severity: 'Medium' },
      { name: 'Leaf Blast', symptoms: 'Diamond-shaped spindle lesions with gray centers and brown borders.', severity: 'High-Critical' }
    ]
  }
]

const useEncyclopediaStore = create<EncyclopediaState>(() => ({
  crops: encyclopediaCrops
}))

export default useEncyclopediaStore
export type { EncyclopediaState }

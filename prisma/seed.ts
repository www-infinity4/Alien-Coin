import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../src/generated/prisma/client';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'dev.db');
const adapter = new PrismaLibSql({ url: `file:${dbPath}` });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('Seeding database...');

  // Songs
  const songs = [
    {
      title: "What a Wonderful World",
      artist: "Louis Armstrong",
      year: 1967,
      archiveUrl: "https://archive.org/details/LouisArmstrongWhatAWonderfulWorld",
      youtubeUrl: "https://www.youtube.com/watch?v=CWzrABouyeE",
      genreTags: JSON.stringify(["jazz", "pop", "classic"]),
      durationSec: 138,
      sources: JSON.stringify(["ABC Records (1967)", "RIAA Gold Certification"])
    },
    {
      title: "Space Oddity",
      artist: "David Bowie",
      year: 1969,
      archiveUrl: null,
      youtubeUrl: "https://www.youtube.com/watch?v=iYYRH4apXDo",
      genreTags: JSON.stringify(["rock", "art-rock", "space-age"]),
      durationSec: 314,
      sources: JSON.stringify(["Phillips Records (1969)", "Top of the Pops BBC"])
    },
    {
      title: "Here Comes the Sun",
      artist: "The Beatles",
      year: 1969,
      archiveUrl: null,
      youtubeUrl: "https://www.youtube.com/watch?v=KQetemT1sWc",
      genreTags: JSON.stringify(["rock", "pop", "classic-rock"]),
      durationSec: 185,
      sources: JSON.stringify(["Apple Records Abbey Road (1969)", "George Harrison compositions"])
    },
    {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      year: 1975,
      archiveUrl: null,
      youtubeUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
      genreTags: JSON.stringify(["rock", "opera-rock", "progressive"]),
      durationSec: 354,
      sources: JSON.stringify(["EMI Records (1975)", "A Night at the Opera album"])
    },
    {
      title: "Imagine",
      artist: "John Lennon",
      year: 1971,
      archiveUrl: "https://archive.org/details/john-lennon-imagine",
      youtubeUrl: "https://www.youtube.com/watch?v=YkgkThdzX-8",
      genreTags: JSON.stringify(["pop", "soft-rock", "iconic"]),
      durationSec: 187,
      sources: JSON.stringify(["Apple Records (1971)", "RIAA multi-platinum"])
    },
    {
      title: "Purple Rain",
      artist: "Prince",
      year: 1984,
      archiveUrl: null,
      youtubeUrl: "https://www.youtube.com/watch?v=TvnYmWpD_T8",
      genreTags: JSON.stringify(["pop", "rock", "r&b", "funk"]),
      durationSec: 520,
      sources: JSON.stringify(["Warner Bros. Records (1984)", "Purple Rain soundtrack"])
    },
    {
      title: "Superstition",
      artist: "Stevie Wonder",
      year: 1972,
      archiveUrl: null,
      youtubeUrl: "https://www.youtube.com/watch?v=0CFuCYNx-1g",
      genreTags: JSON.stringify(["funk", "soul", "r&b"]),
      durationSec: 245,
      sources: JSON.stringify(["Motown Records (1972)", "Talking Book album"])
    },
    {
      title: "Johnny B. Goode",
      artist: "Chuck Berry",
      year: 1958,
      archiveUrl: "https://archive.org/details/ChuckBerryJohnnyBGoode",
      youtubeUrl: "https://www.youtube.com/watch?v=ZmDfGMQfEBI",
      genreTags: JSON.stringify(["rock-and-roll", "blues", "classic"]),
      durationSec: 162,
      sources: JSON.stringify(["Chess Records (1958)", "Rock and Roll Hall of Fame 500 Songs"])
    },
    {
      title: "Strange Fruit",
      artist: "Billie Holiday",
      year: 1939,
      archiveUrl: "https://archive.org/details/BillieHolidayStrangeFruit1939",
      youtubeUrl: "https://www.youtube.com/watch?v=Web007rzSOI",
      genreTags: JSON.stringify(["jazz", "blues", "protest"]),
      durationSec: 175,
      sources: JSON.stringify(["Commodore Records (1939)", "Time Magazine song of the century"])
    },
    {
      title: "A Change Is Gonna Come",
      artist: "Sam Cooke",
      year: 1964,
      archiveUrl: "https://archive.org/details/SamCookeAChangeIsGonnaCome",
      youtubeUrl: "https://www.youtube.com/watch?v=wEBlaMOmKV4",
      genreTags: JSON.stringify(["soul", "r&b", "civil-rights"]),
      durationSec: 191,
      sources: JSON.stringify(["RCA Victor (1964)", "Rolling Stone 500 Greatest Songs"])
    }
  ];

  for (const song of songs) {
    await prisma.song.create({ data: song });
  }
  console.log('Songs seeded');

  // Movies
  const movies = [
    {
      title: "Metropolis",
      year: 1927,
      archiveUrl: "https://archive.org/details/Metropolis_1927",
      youtubeUrl: "https://www.youtube.com/watch?v=2ArKvNi6DZA",
      runtimeMin: 153,
      rating: "Unrated",
      sources: JSON.stringify(["UFA (1927)", "UNESCO Memory of the World"])
    },
    {
      title: "Nosferatu",
      year: 1922,
      archiveUrl: "https://archive.org/details/Nosferatu_the_Vampire_1922",
      youtubeUrl: "https://www.youtube.com/watch?v=FM2UBkqkbzk",
      runtimeMin: 94,
      rating: "Unrated",
      sources: JSON.stringify(["Prana Film (1922)", "Public domain restored print"])
    },
    {
      title: "The General",
      year: 1926,
      archiveUrl: "https://archive.org/details/TheGeneral_780",
      youtubeUrl: "https://www.youtube.com/watch?v=cYGQ9NpS4fI",
      runtimeMin: 79,
      rating: "Unrated",
      sources: JSON.stringify(["United Artists (1926)", "Buster Keaton filmography"])
    },
    {
      title: "City Lights",
      year: 1931,
      archiveUrl: "https://archive.org/details/CityLights1931",
      youtubeUrl: "https://www.youtube.com/watch?v=AKvZBBQAFGc",
      runtimeMin: 87,
      rating: "Unrated",
      sources: JSON.stringify(["United Artists (1931)", "Chaplin filmography"])
    },
    {
      title: "It's a Wonderful Life",
      year: 1946,
      archiveUrl: "https://archive.org/details/ItsAWonderfulLife1946",
      youtubeUrl: "https://www.youtube.com/watch?v=LMd0VWKRQBQ",
      runtimeMin: 130,
      rating: "PG",
      sources: JSON.stringify(["RKO Radio Pictures (1946)", "National Film Registry 1990"])
    },
    {
      title: "Sherlock Jr.",
      year: 1924,
      archiveUrl: "https://archive.org/details/SherlockJr_1924",
      youtubeUrl: "https://www.youtube.com/watch?v=5B5SQXJQZLE",
      runtimeMin: 45,
      rating: "Unrated",
      sources: JSON.stringify(["Metro Pictures (1924)", "Buster Keaton filmography"])
    },
    {
      title: "The Kid",
      year: 1921,
      archiveUrl: "https://archive.org/details/TheKid1921Chaplin",
      youtubeUrl: "https://www.youtube.com/watch?v=RONIax0_1ec",
      runtimeMin: 68,
      rating: "Unrated",
      sources: JSON.stringify(["First National Pictures (1921)", "Chaplin filmography"])
    },
    {
      title: "Safety Last!",
      year: 1923,
      archiveUrl: "https://archive.org/details/SafetyLast1923",
      youtubeUrl: "https://www.youtube.com/watch?v=rG5GRrAD2fI",
      runtimeMin: 70,
      rating: "Unrated",
      sources: JSON.stringify(["Pathé Exchange (1923)", "Harold Lloyd filmography"])
    },
    {
      title: "Sunrise: A Song of Two Humans",
      year: 1927,
      archiveUrl: "https://archive.org/details/Sunrise1927",
      youtubeUrl: "https://www.youtube.com/watch?v=lRrjqoI6TH0",
      runtimeMin: 95,
      rating: "Unrated",
      sources: JSON.stringify(["Fox Film Corporation (1927)", "Academy Award Best Picture 1929"])
    },
    {
      title: "Wings",
      year: 1927,
      archiveUrl: "https://archive.org/details/Wings1927",
      youtubeUrl: "https://www.youtube.com/watch?v=wQa3c3LT6Pw",
      runtimeMin: 144,
      rating: "Unrated",
      sources: JSON.stringify(["Paramount Pictures (1927)", "First Academy Award Best Picture"])
    }
  ];

  for (const movie of movies) {
    await prisma.movie.create({ data: movie });
  }
  console.log('Movies seeded');

  // Trees
  const trees = [
    {
      commonName: "Live Oak",
      scientificName: "Quercus virginiana",
      hardinessZones: JSON.stringify(["7", "8", "9", "10"]),
      nativeRegions: JSON.stringify(["Southeastern United States", "Gulf Coast"]),
      careNotes: "Drought tolerant once established. Prefers full sun. Iconic canopy tree draped in Spanish moss.",
      sources: JSON.stringify(["USDA Plants Database", "Audubon Society Field Guide"])
    },
    {
      commonName: "White Oak",
      scientificName: "Quercus alba",
      hardinessZones: JSON.stringify(["3", "4", "5", "6", "7", "8", "9"]),
      nativeRegions: JSON.stringify(["Eastern North America"]),
      careNotes: "Long-lived, slow growing. Produces sweet acorns favored by wildlife. Deep taproot makes transplanting difficult.",
      sources: JSON.stringify(["USDA Plants Database", "Native Tree Society"])
    },
    {
      commonName: "Sycamore",
      scientificName: "Platanus occidentalis",
      hardinessZones: JSON.stringify(["4", "5", "6", "7", "8", "9"]),
      nativeRegions: JSON.stringify(["Eastern North America", "Midwest"]),
      careNotes: "Grows near water. Distinctive white/cream bark. One of the largest deciduous trees in North America.",
      sources: JSON.stringify(["USDA Plants Database", "Arbor Day Foundation"])
    },
    {
      commonName: "Bald Cypress",
      scientificName: "Taxodium distichum",
      hardinessZones: JSON.stringify(["4", "5", "6", "7", "8", "9", "10", "11"]),
      nativeRegions: JSON.stringify(["Southeastern US", "Mississippi Valley"]),
      careNotes: "Thrives in wet or dry conditions. Produces 'knees' in waterlogged soil. Ancient specimens can live 1000+ years.",
      sources: JSON.stringify(["USDA Plants Database", "LSU AgCenter"])
    },
    {
      commonName: "Longleaf Pine",
      scientificName: "Pinus palustris",
      hardinessZones: JSON.stringify(["7", "8", "9", "10"]),
      nativeRegions: JSON.stringify(["Southeastern US Coastal Plain"]),
      careNotes: "Fire-adapted. Supports the endangered Red-cockaded Woodpecker. Once dominated 90 million acres of the South.",
      sources: JSON.stringify(["The Longleaf Alliance", "USDA Forest Service"])
    },
    {
      commonName: "Sugar Maple",
      scientificName: "Acer saccharum",
      hardinessZones: JSON.stringify(["3", "4", "5", "6", "7", "8"]),
      nativeRegions: JSON.stringify(["Northeastern US", "Canada"]),
      careNotes: "Source of maple syrup. Spectacular fall foliage. Needs cold winters to produce good sap flow.",
      sources: JSON.stringify(["USDA Plants Database", "Cornell Maple Program"])
    },
    {
      commonName: "American Elm",
      scientificName: "Ulmus americana",
      hardinessZones: JSON.stringify(["2", "3", "4", "5", "6", "7", "8", "9"]),
      nativeRegions: JSON.stringify(["Eastern North America"]),
      careNotes: "Classic vase-shaped street tree decimated by Dutch Elm disease. Disease-resistant cultivars now available.",
      sources: JSON.stringify(["The Elm Research Institute", "USDA Plants Database"])
    },
    {
      commonName: "Pawpaw",
      scientificName: "Asimina triloba",
      hardinessZones: JSON.stringify(["5", "6", "7", "8", "9"]),
      nativeRegions: JSON.stringify(["Eastern US", "Appalachian region"]),
      careNotes: "Produces largest edible fruit native to North America. Needs cross-pollination. Grows in forest understory.",
      sources: JSON.stringify(["KSU Pawpaw Program", "USDA Plants Database"])
    },
    {
      commonName: "Black Walnut",
      scientificName: "Juglans nigra",
      hardinessZones: JSON.stringify(["4", "5", "6", "7", "8", "9"]),
      nativeRegions: JSON.stringify(["Eastern US", "Great Plains"]),
      careNotes: "Produces juglone which inhibits some plants. Highly valued timber tree. Produces rich, flavorful nuts.",
      sources: JSON.stringify(["USDA Plants Database", "Missouri Botanical Garden"])
    },
    {
      commonName: "Sassafras",
      scientificName: "Sassafras albidum",
      hardinessZones: JSON.stringify(["4", "5", "6", "7", "8", "9"]),
      nativeRegions: JSON.stringify(["Eastern North America"]),
      careNotes: "Distinctive mitten-shaped leaves with three different forms on same tree. Root bark used in root beer historically.",
      sources: JSON.stringify(["USDA Plants Database", "Appalachian Ethnobotany"])
    }
  ];

  for (const tree of trees) {
    await prisma.tree.create({ data: tree });
  }
  console.log('Trees seeded');

  // Planting Locations
  const plantingLocations = [
    {
      name: "Appalachian Trail Corridor",
      region: "Eastern United States",
      climateTags: JSON.stringify(["temperate", "montane", "high-rainfall"]),
      permitNotes: "Planting within 200ft of trail requires ATC permit. Contact local trail maintaining club.",
      sources: JSON.stringify(["Appalachian Trail Conservancy", "USDA Forest Service"]),
      ecoregion: "Blue Ridge Ecoregion",
      referenceLat: 36.5,
      referenceLng: -82.0,
    },
    {
      name: "Gulf Coast Wetlands",
      region: "Southern United States",
      climateTags: JSON.stringify(["subtropical", "coastal", "high-humidity"]),
      permitNotes: "Section 404 wetlands permit required for any ground disturbance. Contact Army Corps of Engineers.",
      sources: JSON.stringify(["EPA Wetlands Program", "NOAA Coastal Management"]),
      ecoregion: "Gulf Coastal Plain",
      referenceLat: 29.5,
      referenceLng: -90.0,
    },
    {
      name: "Great Plains Prairie",
      region: "Central United States",
      climateTags: JSON.stringify(["semi-arid", "continental", "wind-exposed"]),
      permitNotes: "Check county soil conservation district for native plant programs and cost-share opportunities.",
      sources: JSON.stringify(["NRCS Prairie Pothole Region", "The Nature Conservancy"]),
      ecoregion: "Central Tallgrass Prairie",
      referenceLat: 38.5,
      referenceLng: -97.0,
    },
    {
      name: "Pacific Northwest Rainforest",
      region: "Northwestern United States",
      climateTags: JSON.stringify(["oceanic", "high-rainfall", "mild-winters"]),
      permitNotes: "State DNR approval needed for riparian plantings. Check for salmon habitat protections.",
      sources: JSON.stringify(["WA Dept of Natural Resources", "OR Dept of Forestry"]),
      ecoregion: "Pacific Temperate Rainforest",
      referenceLat: 47.5,
      referenceLng: -123.5,
    },
    {
      name: "Sonoran Desert Edge",
      region: "Southwestern United States",
      climateTags: JSON.stringify(["arid", "hot-dry-summers", "mild-winters"]),
      permitNotes: "Saguaro cactus is protected - permit required to move or transplant. Contact AZ Game & Fish.",
      sources: JSON.stringify(["Arizona Native Plant Society", "Sonoran Desert Museum"]),
      ecoregion: "Sonoran Desert",
      referenceLat: 32.5,
      referenceLng: -111.5,
    },
    {
      name: "Mississippi River Delta",
      region: "Louisiana, Mississippi",
      climateTags: JSON.stringify(["subtropical", "floodplain", "humid"]),
      permitNotes: "Coastal Use Permit from LA CPRA required for shoreline plantings. NRCS cost-share available.",
      sources: JSON.stringify(["Louisiana CPRA", "Mississippi River Delta Coalition"]),
      ecoregion: "Mississippi Alluvial Valley",
      referenceLat: 32.0,
      referenceLng: -91.5,
    },
    {
      name: "New England Forests",
      region: "Northeastern United States",
      climateTags: JSON.stringify(["humid-continental", "cold-winters", "four-seasons"]),
      permitNotes: "Check local conservation commission for buffer zone requirements near wetlands and streams.",
      sources: JSON.stringify(["New England Wild Flower Society", "Harvard Forest"]),
      ecoregion: "New England/Acadian Forests",
      referenceLat: 44.5,
      referenceLng: -71.5,
    },
    {
      name: "Rocky Mountain Foothills",
      region: "Western United States",
      climateTags: JSON.stringify(["semi-arid", "mountain", "variable"]),
      permitNotes: "Fire-wise planting guidelines apply. Check with local fire district for defensible space requirements.",
      sources: JSON.stringify(["Colorado State Forest Service", "Rocky Mountain Research Station"]),
      ecoregion: "Southern Rockies",
      referenceLat: 39.5,
      referenceLng: -105.5,
    },
    {
      name: "Florida Everglades Buffer",
      region: "Southern Florida",
      climateTags: JSON.stringify(["tropical", "wet-dry-season", "limestone"]),
      permitNotes: "South Florida Water Management District permit required. Invasive species removal may be incentivized.",
      sources: JSON.stringify(["Everglades Foundation", "SFWMD"]),
      ecoregion: "Floridian Pine Savanna",
      referenceLat: 26.0,
      referenceLng: -80.5,
    },
    {
      name: "Great Lakes Shoreline",
      region: "Great Lakes Region",
      climateTags: JSON.stringify(["humid-continental", "lake-effect", "cold-winters"]),
      permitNotes: "Great Lakes Coastal Review required for plantings within 500ft of water. EGLE permit in Michigan.",
      sources: JSON.stringify(["Great Lakes Commission", "Michigan DEQ"]),
      ecoregion: "Great Lakes",
      referenceLat: 45.5,
      referenceLng: -84.0,
    }
  ];

  for (const loc of plantingLocations) {
    await prisma.plantingLocation.create({ data: loc });
  }
  console.log('Planting locations seeded');

  // Treat Ideas
  const treatIdeas = [
    {
      name: "Pawpaw Fruit",
      type: "fruit",
      originCountry: "United States",
      seasonality: "Late summer to early fall (August-October)",
      whereToBuyNotes: "Rarely found in supermarkets due to short shelf life. Visit farmers markets in Appalachian states, Ohio River valley. Pick-your-own farms. The KSU Pawpaw Program directory lists farms.",
      sources: JSON.stringify(["KSU Pawpaw Program", "Slow Food USA"])
    },
    {
      name: "Mayhaw Jelly",
      type: "preserve",
      originCountry: "United States",
      seasonality: "Spring (April-May harvest)",
      whereToBuyNotes: "Southern specialty stores in Louisiana, Georgia, Texas. Online from Cajun grocers. Small-batch producers at Southern farmers markets.",
      sources: JSON.stringify(["Southern Foodways Alliance", "LSU AgCenter"])
    },
    {
      name: "Sorghum Molasses",
      type: "sweetener",
      originCountry: "United States",
      seasonality: "Fall harvest (September-November)",
      whereToBuyNotes: "Appalachian crafts fairs, Kentucky and Tennessee country stores. Muddy Pond Sorghum (TN) ships nationwide. Sweet Souther Sweet Tea shops.",
      sources: JSON.stringify(["National Sweet Sorghum Producers Association", "Appalachian Food Summit"])
    },
    {
      name: "Persimmon Pudding",
      type: "dessert",
      originCountry: "United States",
      seasonality: "Fall (after first frost, October-November)",
      whereToBuyNotes: "Indiana persimmon festivals (Mitchell, IN). Homemade from wild American persimmons. Farmers markets in Indiana and surrounding states.",
      sources: JSON.stringify(["Indiana Persimmon Festival", "USDA Native Fruits"])
    },
    {
      name: "Scuppernong Grapes",
      type: "fruit",
      originCountry: "United States",
      seasonality: "Late summer (August-September)",
      whereToBuyNotes: "Farm stands and u-pick farms in Carolinas, Georgia, Virginia. Muscadine/Scuppernong wines from NC wineries. Coastal Plain farmers markets.",
      sources: JSON.stringify(["NC Dept of Agriculture", "Cooperative Extension Service"])
    },
    {
      name: "Muscadine Preserves",
      type: "preserve",
      originCountry: "United States",
      seasonality: "Late summer to early fall",
      whereToBuyNotes: "Southern country stores, roadside stands in the Deep South. Small-batch jam makers at craft fairs. Some grocery chains in the South carry local brands.",
      sources: JSON.stringify(["Southern Living", "USDA NRCS Plant Guide"])
    },
    {
      name: "Sourwood Honey",
      type: "sweetener",
      originCountry: "United States",
      seasonality: "Summer (July-August bloom)",
      whereToBuyNotes: "Blue Ridge Mountains region. Asheville NC honey vendors. Appalachian mountain fairs. Bee Supply stores in Western NC and North Georgia.",
      sources: JSON.stringify(["NC State Beekeepers Association", "USDA Honey Bee Research"])
    },
    {
      name: "Ramps",
      type: "vegetable",
      originCountry: "United States",
      seasonality: "Spring (March-May)",
      whereToBuyNotes: "Appalachian farmers markets in spring. Ramp festivals in WV, TN, NC. Some specialty grocers and high-end restaurants. Forage sustainably or buy from sustainable harvesters.",
      sources: JSON.stringify(["Appalachian Ramp Festival", "Appalachian Foodways"])
    },
    {
      name: "Poke Sallet (Prepared)",
      type: "vegetable",
      originCountry: "United States",
      seasonality: "Spring (young shoots, April-May)",
      whereToBuyNotes: "CAUTION: Must be properly boiled multiple times to remove toxins. Traditional Appalachian dish. Home foragers only - not commercially sold. Poke Sallet Festivals in Harlan County KY.",
      sources: JSON.stringify(["Appalachian Food Traditions", "USDA Phytotoxin Warning"])
    },
    {
      name: "Hickory Nut Cake",
      type: "dessert",
      originCountry: "United States",
      seasonality: "Fall and winter (nuts harvested October)",
      whereToBuyNotes: "Home bakers and specialty Appalachian bakeries. Mountain Heritage festivals in WNC. The Foxfire cookbook series has recipes. Forage hickory nuts from wild trees.",
      sources: JSON.stringify(["Foxfire Book Series", "Appalachian Food Heritage"])
    }
  ];

  for (const treat of treatIdeas) {
    await prisma.treatIdea.create({ data: treat });
  }
  console.log('Treat ideas seeded');

  // Greek Gods
  const greekGods = [
    {
      name: "Hermes",
      domain: "Messenger, Travel, Commerce, Trickery, Thieves",
      storyTitle: "The Theft of Apollo's Cattle",
      storyText: "On the very day of his birth, the infant Hermes slipped out of his cradle and crept to Pieria, where he stole fifty of Apollo's sacred cattle, driving them backwards so their tracks would mislead any pursuer. When Apollo discovered the theft and confronted the baby god, Hermes had already invented the lyre from a tortoise shell and played such enchanting music that Apollo, captivated, agreed to trade the cattle for the instrument. Zeus, watching the exchange from Olympus, laughed at his newest son's cunning and appointed Hermes the divine herald, giving him winged sandals and the caduceus — a staff entwined with serpents that became the symbol of his office.",
      primarySources: JSON.stringify(["Homeric Hymn to Hermes", "Hesiod Theogony"]),
      secondarySources: JSON.stringify(["Graves, The Greek Myths", "Kerényi, The Gods of the Greeks"])
    },
    {
      name: "Athena",
      domain: "Wisdom, Strategy, Crafts, Civilization, Justice",
      storyTitle: "The Contest for Athens",
      storyText: "When the city of Athens was founded, both Athena and Poseidon desired to be its patron deity and agreed to let the people choose based on which god gave the better gift. Poseidon struck his trident into the Acropolis and a great saltwater spring burst forth, representing naval power and trade. Athena then touched her spear to the rocky ground and an olive tree grew, offering wood, food, and oil to the people. The citizens and gods judged Athena's gift more beneficial to peaceful civilization, and she became the patron of the city that would bear her name, with the Parthenon built in her honor on the very spot of the contest.",
      primarySources: JSON.stringify(["Herodotus VIII.55", "Apollodorus Library III.14.1"]),
      secondarySources: JSON.stringify(["Burkert, Greek Religion", "Powell, Classical Myth"])
    },
    {
      name: "Poseidon",
      domain: "Sea, Earthquakes, Horses, Storms",
      storyTitle: "Poseidon and the Building of Troy",
      storyText: "After Zeus punished Poseidon and Apollo for their rebellion on Olympus, the two gods were sent to serve Laomedon, king of Troy, as laborers for a year. Poseidon built the magnificent walls of Troy while Apollo tended the royal flocks on the slopes of Mount Ida, but when the year ended, treacherous Laomedon refused to pay the gods their promised wages and threatened to sell them into slavery. Poseidon, enraged by this dishonor, later sent a great sea monster to ravage the Trojan coast, and though the monster was slain by Heracles, Poseidon's hatred of Troy endured through the Trojan War, where he sided with the Greeks against the city he himself had helped to build.",
      primarySources: JSON.stringify(["Iliad XXI.441-457", "Pindar Olympian Ode VIII"]),
      secondarySources: JSON.stringify(["Gantz, Early Greek Myth", "Hard, The Routledge Handbook of Greek Mythology"])
    },
    {
      name: "Artemis",
      domain: "Hunt, Moon, Wilderness, Childbirth, Young Women",
      storyTitle: "Actaeon and the Sacred Pool",
      storyText: "The hunter Actaeon, wandering through the forest of Cithaeron after a morning's successful hunt, stumbled upon a hidden grotto where Artemis and her nymphs were bathing in a sacred pool. The goddess, furious that a mortal man had seen her unclothed, splashed water in his face and transformed him into a stag before he could flee or speak. Actaeon, now in the form of a great stag but retaining his human mind, ran through the forest in terror until his own fifty hunting hounds caught his scent, surrounded him, and tore him apart, not recognizing the man they had served for years. Artemis watched without remorse, for the laws of her sacred spaces were inviolate, and no mortal might gaze upon the goddess of the hunt without consequence.",
      primarySources: JSON.stringify(["Ovid Metamorphoses III.138-252", "Diodorus Siculus IV.81"]),
      secondarySources: JSON.stringify(["Otto, The Homeric Gods", "Calasso, The Marriage of Cadmus and Harmony"])
    },
    {
      name: "Hephaestus",
      domain: "Fire, Forge, Craftsmanship, Volcanoes, Metalworking",
      storyTitle: "The Net of Hephaestus",
      storyText: "When Hephaestus discovered that his wife Aphrodite was carrying on an affair with Ares, the god of war, he did not rage or fight but retreated to his forge and spent days crafting an invisible net of bronze wire so fine it could not be seen yet so strong that no god could break it. He draped the net over the bed he shared with Aphrodite, pretending to travel to Lemnos, and when Ares arrived and the two lovers lay together, the net sprang shut around them, trapping them helplessly. Hephaestus then called all the Olympian gods to witness his humiliation, but the gods could only laugh at the spectacle, Poseidon eventually negotiating the release of the captives by pledging that Ares would pay the adulterer's fine—a debt that, some say, was never truly collected.",
      primarySources: JSON.stringify(["Odyssey VIII.266-366", "Homeric Hymn to Aphrodite"]),
      secondarySources: JSON.stringify(["Burkert, Greek Religion", "Kerenyi, Gods of the Greeks"])
    }
  ];

  for (const god of greekGods) {
    await prisma.greekGod.create({ data: god });
  }
  console.log('Greek gods seeded');

  // Coins
  const coins = [
    {
      name: "1909-S VDB Lincoln Cent",
      issuerCountry: "United States",
      denomination: "1 cent",
      year: 1909,
      mint: "San Francisco",
      mintage: "484,000",
      composition: "95% copper, 5% tin and zinc",
      diameterMm: 19.05,
      coinTypeTags: JSON.stringify(["cent", "lincoln", "key-date", "rare"]),
      historyText: "The 1909-S VDB Lincoln cent is one of the most famous and sought-after coins in American numismatics. Victor David Brenner designed the Lincoln cent, and his initials 'VDB' originally appeared prominently on the reverse. Public outcry over the prominence of the designer's initials led the Mint to remove them after only 484,000 were struck at San Francisco, making the coin instantly rare.",
      collectorNotes: "Graded examples in MS-65 or higher can fetch $100,000 or more. Beware of altered 1909-S coins (removed VDB) and counterfeits. Key identifier: 'VDB' on reverse bottom, 'S' mintmark on obverse under date.",
      whereToFindLinks: JSON.stringify(["https://www.pcgs.com", "https://www.ngccoin.com", "https://www.ha.com"]),
      sources: JSON.stringify(["Red Book (A Guide Book of United States Coins)", "PCGS CoinFacts"])
    },
    {
      name: "1916-D Mercury Dime",
      issuerCountry: "United States",
      denomination: "10 cents",
      year: 1916,
      mint: "Denver",
      mintage: "264,000",
      composition: "90% silver, 10% copper",
      diameterMm: 17.9,
      coinTypeTags: JSON.stringify(["dime", "mercury", "key-date", "silver", "rare"]),
      historyText: "The Mercury Dime series began in 1916 designed by Adolph Weinman, featuring Liberty wearing a winged cap (mistaken by many for the god Mercury). The Denver mint struck only 264,000 examples in 1916, making it the key date of the series and one of the most coveted 20th-century U.S. coins.",
      collectorNotes: "Full band (FB) designation for the bands on the fasces reverse adds significant premium. MS-65 FB examples can exceed $300,000. The 'D' mintmark is small and located on the reverse above the 'E' of 'ONE'.",
      whereToFindLinks: JSON.stringify(["https://www.pcgs.com", "https://www.ngccoin.com"]),
      sources: JSON.stringify(["Red Book", "PCGS CoinFacts", "Breen Complete Encyclopedia"])
    },
    {
      name: "1804 Silver Dollar (Class I)",
      issuerCountry: "United States",
      denomination: "1 dollar",
      year: 1804,
      mint: "Philadelphia",
      mintage: "8 known (Class I)",
      composition: "89.24% silver, 10.76% copper",
      diameterMm: 39.1,
      coinTypeTags: JSON.stringify(["dollar", "draped-bust", "proof", "ultra-rare", "king-of-coins"]),
      historyText: "Known as the 'King of American Coins,' the 1804 Silver Dollar was not actually struck in 1804 but rather in the 1830s as diplomatic gifts. The Class I specimens were the original restrikes made for inclusion in presentation sets given to rulers in Southeast Asia and the Middle East by President Andrew Jackson's emissaries.",
      collectorNotes: "Only 8 Class I specimens are known to exist. The last public sale of one exceeded $7.68 million in 2021. Each specimen is individually documented and tracked. Do not confuse with later Class II and III restrikes.",
      whereToFindLinks: JSON.stringify(["https://www.ha.com", "https://www.stacks.com"]),
      sources: JSON.stringify(["Bowers, The Rare Silver Dollars Dated 1804", "Taxay, U.S. Mint and Coinage"])
    },
    {
      name: "1943 Copper Penny",
      issuerCountry: "United States",
      denomination: "1 cent",
      year: 1943,
      mint: "Philadelphia",
      mintage: "Approximately 40 known",
      composition: "95% copper (error - should be zinc-coated steel)",
      diameterMm: 19.05,
      coinTypeTags: JSON.stringify(["cent", "lincoln", "error-coin", "ultra-rare", "wartime"]),
      historyText: "During World War II, copper was needed for the war effort so the Mint struck cents in zinc-coated steel. A small number of copper planchets from 1942 were inadvertently left in the presses and struck as 1943 cents, creating one of America's most famous error coins. The wartime propaganda that Henry Ford would trade a new car for one turned thousands of 1943 steel cents brass-colored by acid, but genuine examples are extraordinarily rare.",
      collectorNotes: "Test with a magnet - genuine copper specimens are NOT magnetic, while the common 1943 steel cents ARE magnetic. Approximately 40 genuine examples known across all mint marks. Authenticated examples have sold for over $1.7 million.",
      whereToFindLinks: JSON.stringify(["https://www.pcgs.com", "https://www.ngccoin.com"]),
      sources: JSON.stringify(["Red Book", "PCGS CoinFacts", "American Numismatic Association"])
    },
    {
      name: "1955 Double Die Lincoln Cent",
      issuerCountry: "United States",
      denomination: "1 cent",
      year: 1955,
      mint: "Philadelphia",
      mintage: "Approximately 20,000-24,000",
      composition: "95% copper, 5% tin and zinc",
      diameterMm: 19.05,
      coinTypeTags: JSON.stringify(["cent", "lincoln", "double-die", "error", "rare"]),
      historyText: "The 1955 Doubled Die Lincoln Cent is one of the most dramatic and well-known die errors in U.S. coinage history. The doubling is clearly visible to the naked eye on the date and lettering 'LIBERTY' and 'IN GOD WE TRUST,' making it immediately recognizable. The doubled planchets reportedly entered circulation mixed in with cigarette packs dispensed from vending machines in New England.",
      collectorNotes: "Easily identified by strong doubling visible without magnification. Even circulated examples in Good condition sell for $1,000+, while uncirculated examples can fetch $50,000 or more. The 1972 Double Die Lincoln Cent is a more available but similar error.",
      whereToFindLinks: JSON.stringify(["https://www.pcgs.com", "https://www.ngccoin.com"]),
      sources: JSON.stringify(["Red Book", "CONECA Error Coin Reference"])
    },
    {
      name: "1932-D Washington Quarter",
      issuerCountry: "United States",
      denomination: "25 cents",
      year: 1932,
      mint: "Denver",
      mintage: "436,800",
      composition: "90% silver, 10% copper",
      diameterMm: 24.3,
      coinTypeTags: JSON.stringify(["quarter", "washington", "key-date", "silver", "rare"]),
      historyText: "The Washington Quarter series debuted in 1932 on the bicentennial of George Washington's birth, featuring a portrait by sculptor John Flanagan. The Denver Mint struck only 436,800 quarters that year, making it along with the 1932-S the key date of the Washington series. Both were produced during the Great Depression when coin demand was extremely low.",
      collectorNotes: "The 'D' mintmark is on the reverse above the word 'QUARTER.' Average circulated examples sell for $100-$200 while uncirculated MS-65 specimens can exceed $25,000.",
      whereToFindLinks: JSON.stringify(["https://www.pcgs.com", "https://www.ngccoin.com"]),
      sources: JSON.stringify(["Red Book", "PCGS CoinFacts"])
    },
    {
      name: "1794 Flowing Hair Dollar",
      issuerCountry: "United States",
      denomination: "1 dollar",
      year: 1794,
      mint: "Philadelphia",
      mintage: "1,758 (approximately 140 known)",
      composition: "89.24% silver, 10.76% copper",
      diameterMm: 39.5,
      coinTypeTags: JSON.stringify(["dollar", "flowing-hair", "first-year", "ultra-rare", "historic"]),
      historyText: "The 1794 Flowing Hair Dollar holds the distinction of being the first silver dollar struck by the United States Mint. Designed by Robert Scot, it features Liberty with flowing hair on the obverse and an eagle on the reverse. In 2013, a superb gem example sold at auction for $10,016,875, setting a world record for the most expensive coin ever sold at that time.",
      collectorNotes: "The finest known specimen (now graded SP-66 by PCGS) is considered potentially the finest large silver coin surviving from early American history. Even well-circulated examples in G-4 can sell for $100,000 or more.",
      whereToFindLinks: JSON.stringify(["https://www.ha.com", "https://www.stacks.com"]),
      sources: JSON.stringify(["Bowers, Silver Dollars & Trade Dollars of the United States", "Garrett and Guth, The 100 Greatest U.S. Coins"])
    },
    {
      name: "1893-S Morgan Silver Dollar",
      issuerCountry: "United States",
      denomination: "1 dollar",
      year: 1893,
      mint: "San Francisco",
      mintage: "100,000",
      composition: "90% silver, 10% copper",
      diameterMm: 38.1,
      coinTypeTags: JSON.stringify(["dollar", "morgan", "key-date", "silver", "rare"]),
      historyText: "The 1893-S Morgan Silver Dollar is considered the undisputed 'King of the Morgan Dollars.' Only 100,000 were struck and most were used in circulation or melted during the massive coin melts of the early 20th century. Today fewer than 10 are known in mint state, and the coin is the centerpiece of any serious Morgan dollar collection.",
      collectorNotes: "Extremely rare in all grades. An MS-65 example sold for over $6.1 million in 2023. Even heavily worn AG-3 examples sell for $5,000+. Counterfeits exist - authentication by PCGS or NGC is essential.",
      whereToFindLinks: JSON.stringify(["https://www.ha.com", "https://www.pcgs.com"]),
      sources: JSON.stringify(["VAM World (Morgan Dollar Variety Attribution)", "Red Book"])
    },
    {
      name: "2004-D Wisconsin Extra Leaf Quarter",
      issuerCountry: "United States",
      denomination: "25 cents",
      year: 2004,
      mint: "Denver",
      mintage: "Approximately 5,000 (extra leaf variety)",
      composition: "Clad (copper-nickel sandwich)",
      diameterMm: 24.26,
      coinTypeTags: JSON.stringify(["quarter", "state-quarter", "error", "modern-rarity"]),
      historyText: "The 2004-D Wisconsin State Quarter features an extra leaf on the corn stalk in the design—either a high leaf or low leaf variety—believed to be the result of intentional die gouging by a Mint employee. Approximately 5,000 of each variety entered circulation through bags released in Tucson, Arizona, creating a modern rarity that could be found in everyday pocket change for years.",
      collectorNotes: "Two varieties: 'Extra Leaf High' (ELH) and 'Extra Leaf Low' (ELL). Circulated examples sell for $50-200 each, uncirculated examples for several hundred dollars. The story of their discovery and the controversy over whether they were deliberate makes them fascinating error coins.",
      whereToFindLinks: JSON.stringify(["https://www.pcgs.com", "https://www.ngccoin.com"]),
      sources: JSON.stringify(["Coin World (2005 reporting)", "PCGS CoinFacts", "Red Book"])
    },
    {
      name: "Alien Coin (Anndy Lian v2)",
      issuerCountry: "Fictional / Collector Series",
      denomination: "N/A - Collector Token",
      year: 2024,
      mint: "Limited Edition Series",
      mintage: "Series concept",
      composition: "Collector-defined materials",
      diameterMm: null,
      coinTypeTags: JSON.stringify(["alien-coin", "anndy-lian-v2", "series", "fictional-brand", "collector-concept"]),
      historyText: "The Alien Coin (Anndy Lian v2) is a fictional brand concept and collector series created as a creative and educational project. This is NOT a real currency, legal tender, or investment vehicle. The concept imagines a collector token inspired by the idea of extraterrestrial aesthetics and cosmic wonder, envisioned by the creative project 'Alien Coin' as a way to bundle experiences, stories, and educational content into a themed package. The 'Anndy Lian v2' designation refers to a versioned iteration of the series design concept. All items in this series are purely for entertainment, educational, and creative purposes.",
      collectorNotes: "This is a fictional collector concept. No monetary value is implied or should be inferred. The Alien Coin project uses this as a thematic anchor for its experience bundles, which combine music, film, nature, food, mythology, numismatics, gemology, and culinary heritage into themed educational packages.",
      whereToFindLinks: JSON.stringify(["https://github.com/Alien-Coin"]),
      sources: JSON.stringify(["Alien Coin Project Documentation", "Original creative brief"])
    }
  ];

  for (const coin of coins) {
    await prisma.coin.create({ data: coin });
  }
  console.log('Coins seeded');

  // Quotes
  const quotes = [
    {
      speaker: "Abraham Lincoln",
      date: "November 19, 1863",
      quote: "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.",
      context: "Opening lines of the Gettysburg Address, delivered at the dedication of the Soldiers' National Cemetery in Gettysburg, Pennsylvania, during the Civil War.",
      sourceUrl: "https://www.loc.gov/resource/rbpe.24404500/"
    },
    {
      speaker: "George Washington",
      date: "September 19, 1796",
      quote: "The name of American, which belongs to you, in your national capacity, must always exalt the just pride of Patriotism, more than any appellation derived from local discriminations.",
      context: "Washington's Farewell Address, warning against partisan divisions and foreign entanglements.",
      sourceUrl: "https://www.ourdocuments.gov/doc.php?flash=false&doc=15"
    },
    {
      speaker: "Theodore Roosevelt",
      date: "April 23, 1910",
      quote: "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena.",
      context: "Speech 'Citizenship in a Republic' delivered at the Sorbonne in Paris. Known as 'The Man in the Arena' speech.",
      sourceUrl: "https://www.theodorerooseveltcenter.org/Learn-About-TR/TR-Encyclopedia/Culture-and-Society/Man-in-the-Arena.aspx"
    },
    {
      speaker: "Thomas Jefferson",
      date: "July 4, 1776",
      quote: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
      context: "Preamble to the Declaration of Independence, one of the most quoted passages in American political history.",
      sourceUrl: "https://www.archives.gov/founding-docs/declaration-transcript"
    },
    {
      speaker: "Franklin D. Roosevelt",
      date: "March 4, 1933",
      quote: "The only thing we have to fear is fear itself—nameless, unreasoning, unjustified terror which paralyzes needed efforts to convert retreat into advance.",
      context: "First Inaugural Address, delivered during the depths of the Great Depression, calling Americans to action.",
      sourceUrl: "https://www.presidency.ucsb.edu/documents/inaugural-address-8"
    },
    {
      speaker: "John F. Kennedy",
      date: "January 20, 1961",
      quote: "Ask not what your country can do for you—ask what you can do for your country.",
      context: "Inaugural Address, calling upon Americans to serve the nation. One of the most famous presidential inaugural lines in history.",
      sourceUrl: "https://www.jfklibrary.org/archives/other-resources/john-f-kennedy-speeches/inaugural-address-19610120"
    },
    {
      speaker: "Dwight D. Eisenhower",
      date: "January 17, 1961",
      quote: "In the councils of government, we must guard against the acquisition of unwarranted influence, whether sought or unsought, by the military-industrial complex.",
      context: "Farewell Address to the Nation, warning about the growing influence of defense contractors and the military establishment.",
      sourceUrl: "https://www.eisenhowerlibrary.gov/research/online-documents/farewell-address"
    },
    {
      speaker: "Woodrow Wilson",
      date: "April 2, 1917",
      quote: "The world must be made safe for democracy. Its peace must be planted upon the tested foundations of political liberty.",
      context: "Address to Congress requesting a Declaration of War against Germany, marking U.S. entry into World War I.",
      sourceUrl: "https://millercenter.org/the-presidency/presidential-speeches/april-2-1917-address-congress-declaration-war-against-germany"
    },
    {
      speaker: "Ronald Reagan",
      date: "June 12, 1987",
      quote: "Mr. Gorbachev, tear down this wall!",
      context: "Speech at the Brandenburg Gate in West Berlin, directly addressing Soviet General Secretary Mikhail Gorbachev and calling for the demolition of the Berlin Wall.",
      sourceUrl: "https://www.reaganlibrary.gov/archives/speech/remarks-west-berlin"
    },
    {
      speaker: "Barack Obama",
      date: "November 4, 2008",
      quote: "If there is anyone out there who still doubts that America is a place where all things are possible, who still wonders if the dream of our founders is alive in our time, who still questions the power of our democracy, tonight is your answer.",
      context: "Victory speech delivered in Grant Park, Chicago, upon being elected the 44th President of the United States—the first African American to hold the office.",
      sourceUrl: "https://www.npr.org/2008/11/05/96624645/transcript-of-barack-obamas-victory-speech"
    }
  ];

  for (const quote of quotes) {
    await prisma.quote.create({ data: quote });
  }
  console.log('Quotes seeded');

  // Gemstones
  const gemstones = [
    {
      name: "Amethyst",
      type: "Crystalline Quartz",
      mohs: 7.0,
      colors: JSON.stringify(["purple", "violet", "lavender", "deep purple"]),
      formation: "Forms in geodes and alluvial deposits. The purple color results from iron impurities and irradiation within quartz. Major deposits found in volcanic rocks.",
      whereFoundRegions: JSON.stringify(["Brazil", "Uruguay", "Zambia", "Russia", "USA (Arizona)"]),
      ethicalCollectingNotes: "Brazil and Uruguay are major commercial sources with generally good mining practices. Zambian amethyst is often artisanally mined—seek fair trade certified stones. Avoid specimens from conflict regions.",
      whereToBuyNotes: "Available at most gem shows. The Tucson Gem & Mineral Show (February) has excellent selection. Look for saturation of color without black zones. Brazilian cathedral geodes widely available.",
      sources: JSON.stringify(["GIA Gem Encyclopedia", "Mindat.org", "Gemological Institute of America"])
    },
    {
      name: "Rose Quartz",
      type: "Massive Quartz",
      mohs: 7.0,
      colors: JSON.stringify(["pink", "pale pink", "soft rose"]),
      formation: "Occurs in pegmatites and hydrothermal veins. Color comes from microscopic inclusions of dumortierite or structural features. Rarely forms crystals—usually massive.",
      whereFoundRegions: JSON.stringify(["Brazil", "Madagascar", "South Africa", "India", "USA (South Dakota)"]),
      ethicalCollectingNotes: "Madagascar is a top source—buy from vendors who can trace origin. Some Brazilian material is ethically sourced through fair-trade cooperatives. Ask for country of origin.",
      whereToBuyNotes: "Among the most affordable gemstones. Widely available at crystal shops, gem shows. Star rose quartz from Madagascar shows asterism under light—premium specimen.",
      sources: JSON.stringify(["GIA Gem Encyclopedia", "Mindat.org"])
    },
    {
      name: "Labradorite",
      type: "Feldspar",
      mohs: 6.0,
      colors: JSON.stringify(["gray", "dark gray", "spectral blues", "greens", "golds", "oranges"]),
      formation: "A plagioclase feldspar that shows labradorescence—an optical phenomenon caused by light interference between alternating lamellar structures. Forms in igneous and metamorphic rocks.",
      whereFoundRegions: JSON.stringify(["Labrador Canada", "Finland", "Norway", "Madagascar", "Russia"]),
      ethicalCollectingNotes: "Finnish 'spectrolite' (finest material) is commercially mined with good standards. Madagascar labradorite—verify artisanal mining conditions. Canada is reliably sourced.",
      whereToBuyNotes: "Best evaluated in person to assess labradorescence quality. Gem shows and metaphysical crystal shops. Finnish spectrolite commands premium prices for full spectral display.",
      sources: JSON.stringify(["GIA Gem Encyclopedia", "Mindat.org", "Canadian Gemmologist"])
    },
    {
      name: "Moldavite",
      type: "Tektite (Natural Glass)",
      mohs: 5.5,
      colors: JSON.stringify(["forest green", "olive green", "pale green"]),
      formation: "Formed approximately 15 million years ago when a meteorite impact in Bavaria melted terrestrial rock, ejecting molten material that solidified in flight as glass. Found only in Bohemia (Czech Republic), Moravia, and Lusatia.",
      whereFoundRegions: JSON.stringify(["Czech Republic (Bohemia)", "Czech Republic (Moravia)", "Germany (Lusatia)"]),
      ethicalCollectingNotes: "The Czech Republic strictly regulates moldavite collecting—agricultural land digging requires permits. Buy from reputable dealers with certificates. Market flooded with fakes—authentication is critical.",
      whereToBuyNotes: "Buy only from established dealers with authentication documentation. Czech dealers at Tucson or Munich gem shows most reliable. Wire-textured surface (sculpted) indicates natural specimen. Avoid suspiciously cheap 'moldavite.'",
      sources: JSON.stringify(["GIA Gem Encyclopedia", "Bouška, Moldavites", "Mindat.org"])
    },
    {
      name: "Black Tourmaline",
      type: "Tourmaline (Schorl)",
      mohs: 7.5,
      colors: JSON.stringify(["black", "very dark brown"]),
      formation: "Schorl, the black iron-rich variety of tourmaline, forms in granitic pegmatites, metamorphic rocks, and some sedimentary environments. One of the most common minerals in Earth's crust.",
      whereFoundRegions: JSON.stringify(["Brazil", "Sri Lanka", "India", "Africa", "USA (Maine, California)"]),
      ethicalCollectingNotes: "Widely available from many sources. Brazilian material is the most common—verify no child labor involved in small-scale mining. USA specimens from Maine pegmatites are ethically collected by hobbyists.",
      whereToBuyNotes: "Very affordable as mineral specimens. Available at most crystal shops. Large lustrous crystals from Brazil are excellent display pieces. Maine pegmatite specimens at New England rock shows.",
      sources: JSON.stringify(["GIA Gem Encyclopedia", "Mindat.org", "American Mineralogist"])
    },
    {
      name: "Selenite",
      type: "Gypsum Variety",
      mohs: 2.0,
      colors: JSON.stringify(["white", "colorless", "translucent", "pale peach"]),
      formation: "A variety of gypsum (calcium sulfate dihydrate) that forms in evaporite sequences where saline water evaporates. The Cave of Crystals in Mexico contains selenite crystals up to 11 meters long.",
      whereFoundRegions: JSON.stringify(["Mexico (Naica)", "Morocco", "Utah USA", "Australia", "Poland"]),
      ethicalCollectingNotes: "Utah selenite can be collected on BLM land with a free permit. Morocco is a major commercial source—check for fair labor practices. The Naica crystals are protected—buy only specimens from permitted commercial sources.",
      whereToBuyNotes: "Extremely affordable. Desert Rose variety from Morocco widely available. Wands and plates sold at crystal shops everywhere. Note extreme softness (2 Mohs)—handle with care.",
      sources: JSON.stringify(["GIA Gem Encyclopedia", "Mindat.org", "García-Ruiz Cave of Crystals study"])
    },
    {
      name: "Citrine",
      type: "Crystalline Quartz",
      mohs: 7.0,
      colors: JSON.stringify(["yellow", "orange", "golden brown", "amber"]),
      formation: "Natural citrine (uncommon) forms when quartz contains traces of iron in a specific oxidation state. Most commercial 'citrine' is heat-treated amethyst or smoky quartz. Natural citrine has pale yellow color; heat-treated is deep orange.",
      whereFoundRegions: JSON.stringify(["Brazil", "Bolivia (natural)", "Madagascar", "Russia"]),
      ethicalCollectingNotes: "Heat treatment is standard and accepted in the trade, but should be disclosed. Bolivian natural citrine from the Anahi mine is ethically produced. Ask vendors to distinguish natural from heated material.",
      whereToBuyNotes: "Very affordable. Available everywhere. Bolivian 'ametrine' (half amethyst, half citrine) from the Anahi mine is unique and valuable. Natural pale citrine is rarer and more valuable than heat-treated material.",
      sources: JSON.stringify(["GIA Gem Encyclopedia", "Mindat.org"])
    },
    {
      name: "Lapis Lazuli",
      type: "Rock (Lazurite mineral aggregate)",
      mohs: 5.5,
      colors: JSON.stringify(["deep blue", "royal blue", "with gold pyrite flecks", "with white calcite"]),
      formation: "A metamorphic rock consisting primarily of lazurite (25-40%), calcite, pyrite, and other minerals. Forms in contact metamorphic zones where limestone is intruded by magma. Afghanistan's Badakhshan mines have been active for 6,000+ years.",
      whereFoundRegions: JSON.stringify(["Afghanistan (Badakhshan)", "Chile (Atacama)", "Russia (Lake Baikal)", "USA (Colorado)"]),
      ethicalCollectingNotes: "Afghan lapis funds regional development but has also historically funded armed groups—the situation has improved with certified sourcing programs. Chilean lapis is a reliable ethical alternative. Buy from vendors in the Lapis Lazuli Supply Chain Initiative.",
      whereToBuyNotes: "Afghan lapis is prized for deepest color. Chilean lapis more affordable. Avoid dyed material (streak test on unpolished area). Historically the most prized blue pigment—used in Renaissance paintings as ultramarine.",
      sources: JSON.stringify(["GIA Gem Encyclopedia", "Mindat.org", "National Geographic Lapis Lazuli Trade Report"])
    },
    {
      name: "Obsidian",
      type: "Volcanic Glass",
      mohs: 5.5,
      colors: JSON.stringify(["black", "mahogany", "rainbow (sheen)", "snowflake"]),
      formation: "Forms when viscous lava cools rapidly, preventing crystal formation. One of the few naturally occurring glasses. Native Americans used it extensively for arrowheads and blades due to its razor-sharp fracture edges.",
      whereFoundRegions: JSON.stringify(["USA (Oregon, Idaho, California, Wyoming)", "Mexico", "Iceland", "Italy (Lipari Islands)", "Japan"]),
      ethicalCollectingNotes: "Can be legally collected on BLM lands with permit. Many obsidian quarries on federal land have special use restrictions due to archaeological significance—always check before collecting. Some varieties protected on tribal lands.",
      whereToBuyNotes: "Affordable and widely available. Rainbow and sheen varieties from Mexico are popular display specimens. Oregon glass buttes obsidian widely available. Apache tear nodules (rounded obsidian) popular pocket stones.",
      sources: JSON.stringify(["GIA Gem Encyclopedia", "Mindat.org", "USGS Volcanic Glass Research"])
    },
    {
      name: "Malachite",
      type: "Copper Carbonate Hydroxide",
      mohs: 4.0,
      colors: JSON.stringify(["bright green", "dark green", "banded green"]),
      formation: "A secondary copper mineral that forms by the weathering of primary copper ore deposits. The beautiful banded patterns result from successive crystallization phases. Congo and Zambia have spectacular large botryoidal masses.",
      whereFoundRegions: JSON.stringify(["Democratic Republic of Congo", "Zambia", "Russia (Ural Mountains)", "Australia", "USA (Arizona)"]),
      ethicalCollectingNotes: "DRC material—significant concerns about artisanal mining conditions and child labor in cobalt/copper belt. Zambian material slightly better documented. Russian Ural specimens are ethically mined but harder to obtain post-sanctions. Look for fair trade certification.",
      whereToBuyNotes: "Available at gem shows and mineral dealers. Stunning polished slabs from Congo widely available. Note softness (4 Mohs)—handle carefully. Russian malachite from 19th century Ural mines (antique pieces) commands premiums at auction.",
      sources: JSON.stringify(["GIA Gem Encyclopedia", "Mindat.org", "Responsible Minerals Initiative"])
    }
  ];

  for (const gem of gemstones) {
    await prisma.gemstone.create({ data: gem });
  }
  console.log('Gemstones seeded');

  // Meals
  const meals = [
    {
      mealName: "Biscuits and Gravy",
      cuisineRegion: "Southern United States",
      components: JSON.stringify(["buttermilk biscuits", "pork sausage", "milk", "flour", "black pepper", "salt"]),
      recipeText: "Make biscuits: combine 2 cups flour, 1 tbsp baking powder, 1 tsp salt, 1/3 cup cold butter (cut in). Add 3/4 cup buttermilk, mix until just combined. Pat out 3/4 inch thick, cut rounds, bake at 450°F for 12-14 minutes. For gravy: brown 1 lb bulk pork sausage in skillet, breaking up. Sprinkle 3 tbsp flour over sausage, stir 2 minutes. Gradually add 2 cups whole milk, stirring constantly. Cook until thickened, about 5 minutes. Season generously with black pepper and salt. Split biscuits and ladle gravy over top.",
      historyNotes: "A staple of Southern cooking since the early 19th century, biscuits and gravy was economical peasant food in the post-Civil War South where meat was scarce and biscuits stretched a meal. The dish became the defining breakfast of Appalachia, the Ozarks, and the broader South, evolving from a survival food to a beloved comfort classic.",
      variants: JSON.stringify(["Tomato gravy (Depression-era variant)", "Red-eye gravy with ham instead of sausage", "Vegetarian mushroom gravy", "Chocolate gravy (Arkansas sweet variant)"]),
      sources: JSON.stringify(["Southern Foodways Alliance", "The Lee Bros. Southern Cookbook", "Edna Lewis The Taste of Country Cooking"])
    },
    {
      mealName: "Chicken and Dumplings",
      cuisineRegion: "Appalachian / Southern United States",
      components: JSON.stringify(["whole chicken", "all-purpose flour", "butter", "baking powder", "milk", "celery", "carrots", "onion", "thyme", "bay leaf", "salt", "pepper"]),
      recipeText: "Simmer whole chicken in 8 cups water with celery, carrot, onion, thyme, and bay leaf for 1.5 hours. Remove chicken, strain broth, shred meat. Return broth and chicken to pot over medium heat. Make dumplings: mix 2 cups flour, 1 tbsp baking powder, 1 tsp salt, 3 tbsp cold butter (cut in), 3/4 cup milk—mix until shaggy dough forms. Drop by spoonfuls into simmering broth. Cover and cook 15 minutes without lifting lid. Dumplings are done when cooked through and fluffy.",
      historyNotes: "Chicken and dumplings traces to 17th-century English and Scottish settler cooking adapted to the American frontier. When a laying hen grew too old to produce eggs, it became the pot. The dish was a winter staple throughout Appalachia, representing resourceful cooking that stretched a single bird to feed a family.",
      variants: JSON.stringify(["Flat rolled dumplings (Appalachian style)", "Drop dumplings (fluffier, Southern style)", "With green peas and corn (more vegetables)", "Slow cooker version"]),
      sources: JSON.stringify(["Ronni Lundy Victuals", "Appalachian Food Summit", "Foxfire Series"])
    },
    {
      mealName: "Red Beans and Rice",
      cuisineRegion: "Cajun/Creole, New Orleans Louisiana",
      components: JSON.stringify(["red kidney beans", "andouille sausage", "long grain white rice", "onion", "celery", "bell pepper", "garlic", "bay leaves", "thyme", "Cajun seasoning", "smoked ham hock"]),
      recipeText: "Soak 1 lb dried red kidney beans overnight. Sauté the 'holy trinity' (diced onion, celery, bell pepper) in butter until soft. Add garlic, sliced andouille, bay leaves, thyme, Cajun seasoning. Add drained beans and ham hock with 6 cups water. Simmer 2-3 hours, stirring occasionally and mashing some beans against pot sides to thicken. Remove bay leaves and ham hock, shred any ham meat and return to pot. Adjust seasoning. Serve over steamed long-grain white rice with hot sauce.",
      historyNotes: "Red beans and rice is the quintessential Monday dish of New Orleans, a tradition dating to the 19th century when Monday was laundry day. The dish could simmer unattended all day while women washed clothes. The ham bone from Sunday dinner flavored the beans. Louis Armstrong signed his letters 'Red Beans and Ricely Yours,' cementing the dish's cultural status.",
      variants: JSON.stringify(["With smoked sausage instead of andouille", "Vegetarian with smoked paprika", "With hot links (Texas variation)", "Camellia brand dried beans (New Orleans standard)"]),
      sources: JSON.stringify(["Leah Chase Dooky Chase Cookbook", "New Orleans Times-Picayune Food Section", "Southern Foodways Alliance"])
    },
    {
      mealName: "Shrimp and Grits",
      cuisineRegion: "Low Country South Carolina / Georgia",
      components: JSON.stringify(["fresh shrimp", "stone-ground grits", "butter", "cheddar cheese", "bacon", "garlic", "lemon", "green onions", "Worcestershire sauce", "Tabasco"]),
      recipeText: "Cook stone-ground grits in 4 cups water with 1 tsp salt according to package. Finish with 2 tbsp butter and 1 cup sharp cheddar. For shrimp: cook 4 strips bacon until crisp, reserve fat. Season 1 lb large shrimp with salt and pepper. Sauté garlic in bacon fat 30 seconds. Add shrimp and cook 2-3 minutes per side. Deglaze with splash of white wine and squeeze of lemon. Add crumbled bacon, diced green onions, dash Worcestershire and Tabasco. Spoon over grits.",
      historyNotes: "Shrimp and grits originated as a simple breakfast and fisherman's breakfast in the Lowcountry Gullah Geechee communities of coastal South Carolina and Georgia. It was essentially subsistence food—cheap shrimp from the local waters and ground corn. The dish achieved national fame after NYT food writer Craig Claiborne wrote about a version at a Carolina breakfast in 1985.",
      variants: JSON.stringify(["With tasso ham (Cajun variation)", "Tomato-based sauce", "With mushrooms and leeks", "Charleston style (cheese grits, simple sauté)"]),
      sources: JSON.stringify(["Vertamae Smart-Grosvenor Vibration Cooking", "Virginia Willis Bon Appétit Y'all", "Southern Living"])
    },
    {
      mealName: "Brunswick Stew",
      cuisineRegion: "Virginia / Georgia (disputed origin)",
      components: JSON.stringify(["chicken or pork", "butter beans", "corn", "okra", "tomatoes", "potatoes", "onion", "vinegar", "Worcestershire sauce", "hot sauce", "black pepper"]),
      recipeText: "Smoke or slow-cook 1 whole chicken and 1 lb pork shoulder until very tender, shred meat. In large pot combine shredded meats, 2 cans crushed tomatoes, 1 can butter beans, 2 cups frozen corn, 1 cup sliced okra, 2 diced potatoes, 1 diced onion with 4 cups chicken broth. Simmer 1 hour, stirring frequently. Add 2 tbsp apple cider vinegar, 2 tbsp Worcestershire, hot sauce to taste. Cook until thick enough that a spoon stands upright. Adjust seasoning generously.",
      historyNotes: "Both Brunswick County Virginia and Brunswick Georgia claim to have invented this stew. The Virginia claim dates to 1828 at a political rally, the Georgia claim to 1898. Originally made with squirrel or rabbit, the transition to chicken and pork reflected urbanization. It is the quintessential barbecue accompaniment across the Southeast, particularly at church fundraisers and political gatherings.",
      variants: JSON.stringify(["Georgia-style (sweeter, more tomato-forward)", "Virginia-style (smokier, with pulled pork)", "Original squirrel version (historical)", "Canned commercial versions (Gwaltney, etc.)"]),
      sources: JSON.stringify(["Southern Foodways Alliance", "Richmond Times-Dispatch food archives", "Fred Thompson Barbecue Nation"])
    },
    {
      mealName: "Cornbread",
      cuisineRegion: "Various Southern United States",
      components: JSON.stringify(["stone-ground cornmeal", "buttermilk", "eggs", "baking soda", "salt", "bacon drippings or butter", "cast iron skillet"]),
      recipeText: "Preheat oven to 450°F. Heat cast iron skillet with 2 tbsp bacon drippings in oven. Combine 2 cups stone-ground white cornmeal, 1 tsp baking soda, 1 tsp salt. In another bowl whisk 2 eggs and 2 cups buttermilk. Combine wet and dry ingredients just until mixed. Pour hot bacon drippings from skillet into batter, stir in, then pour batter into smoking skillet. Bake 20-25 minutes until golden and pulling from sides. True Southern cornbread contains no sugar.",
      historyNotes: "Cornbread is the staff of life of the American South, directly descended from Native American corn preparations encountered by the first European colonists. The controversy over sweet versus unsweetened cornbread is both regional and cultural—Southern tradition holds no sugar, while Northern and Midwestern versions often include it. The cast iron skillet is essential for the crispy crust.",
      variants: JSON.stringify(["Jalapeño cheddar cornbread", "Cracklin' cornbread (with pork cracklings)", "Hoe cakes (pan-fried skillet cakes)", "Northern sweet cornbread (with sugar and flour)", "Spoonbread (custard-like Virginia version)"]),
      sources: JSON.stringify(["Edna Lewis The Taste of Country Cooking", "Sean Brock Heritage", "Southern Foodways Alliance"])
    },
    {
      mealName: "Hoppin' John",
      cuisineRegion: "Sea Island Gullah / South Carolina / Lowcountry",
      components: JSON.stringify(["black-eyed peas", "long grain white rice", "smoked pork neck bones", "onion", "garlic", "bay leaves", "thyme", "red pepper flakes", "salt", "pepper"]),
      recipeText: "Soak 1 lb dried black-eyed peas overnight. Simmer pork neck bones in 6 cups water 45 minutes. Remove bones, shred any meat. Sauté diced onion and garlic until soft. Add peas, pork broth, shredded meat, bay leaves, thyme, and red pepper. Simmer 1-1.5 hours until peas are tender. Season with salt and pepper. Cook 2 cups long-grain white rice separately. Serve peas over rice or mixed together (traditionalists prefer separate then combined on the plate).",
      historyNotes: "Hoppin' John is one of the Gullah Geechee people's most significant culinary contributions to American food culture. The dish has African roots—black-eyed peas are native to West Africa and came to the Americas via the slave trade. Eating Hoppin' John on New Year's Day for good luck and prosperity is a deep tradition from the Carolinas to Georgia, the peas representing coins.",
      variants: JSON.stringify(["With field peas instead of black-eyed peas", "Served with collard greens and cornbread (traditional New Year's)", "Red rice alongside (Gullah Geechee)", "Modern versions with smoked turkey"]),
      sources: JSON.stringify(["BJ Dennis Gullah-Geechee cooking", "Vertamae Smart-Grosvenor", "Southern Foodways Alliance"])
    },
    {
      mealName: "Burgoo",
      cuisineRegion: "Kentucky",
      components: JSON.stringify(["mutton or lamb", "chicken", "pork", "tomatoes", "corn", "potatoes", "lima beans", "okra", "onion", "celery", "Worcestershire sauce", "vinegar"]),
      recipeText: "Burgoo is made in massive quantities. For a home version: Slow cook 2 lb mixed meats (lamb/mutton, chicken thighs, pork shoulder) in 8 cups water until falling apart tender, 3-4 hours. Shred all meats, discard bones. In large pot combine meats with their broth, 1 can diced tomatoes, 2 cups frozen corn, 2 cups frozen lima beans, 2 diced potatoes, 1 cup sliced okra, diced onion and celery. Simmer 2 hours, adding water as needed. Finish with Worcestershire, apple cider vinegar, salt and pepper. Should be thick as porridge.",
      historyNotes: "Burgoo is Kentucky's signature outdoor stew, cooked in enormous cast iron kettles at horse races, county fairs, political rallies, and church picnics. The dish has roots in French hunter's stew (bourguignon corruption), Revolutionary War soldier rations, and Native American hominy preparations. Gus Jaubert, a chef who cooked for Confederate General John Hunt Morgan, is often credited with popularizing the dish's Kentucky form.",
      variants: JSON.stringify(["Traditional with mutton (older style)", "Modern chicken-only versions", "State Fair competition versions", "Churchill Downs Derby Day burgoo"]),
      sources: JSON.stringify(["Ronni Lundy Victuals", "John van Willigen Kentucky Foodways", "Southern Foodways Alliance"])
    },
    {
      mealName: "Mess o' Greens",
      cuisineRegion: "Southern United States",
      components: JSON.stringify(["collard greens", "turnip greens", "or mustard greens", "smoked ham hock", "onion", "garlic", "apple cider vinegar", "red pepper flakes", "sugar (pinch)", "salt"]),
      recipeText: "Place smoked ham hock in large pot with 6 cups water. Simmer 1 hour. Remove hock, let cool, shred meat and return to pot with liquid (potlikker). Add diced onion and garlic, simmer 15 minutes. Strip leaves from 2 large bunches of greens, tear into pieces, wash thoroughly. Add to pot in batches, stirring to wilt. Add red pepper flakes, splash of apple cider vinegar, pinch of sugar. Simmer 45-90 minutes until greens are very tender and silky. Season with salt. Serve with cornbread to sop up the potlikker.",
      historyNotes: "Cooked greens represent some of the oldest and most nourishing food in the American South, drawing on West African vegetable cooking traditions and the nutritional wisdom of using every part of the plant. The potlikker—the rich broth at the bottom of the pot—was so valued that it was the subject of a famous debate between President FDR and Southern politicians over whether it should be sopped with cornbread or dunked.",
      variants: JSON.stringify(["Collard greens (most common Southern)", "Turnip greens with diced turnip roots", "Mixed greens pot", "Vegetarian with smoked paprika and liquid smoke"]),
      sources: JSON.stringify(["Edna Lewis The Taste of Country Cooking", "Vertamae Smart-Grosvenor", "Southern Foodways Alliance"])
    },
    {
      mealName: "Country Ham with Redeye Gravy",
      cuisineRegion: "Virginia / Tennessee / Appalachian",
      components: JSON.stringify(["country ham slices", "black coffee", "butter", "black pepper"]),
      recipeText: "Slice country ham about 1/4 inch thick. Score fat edges to prevent curling. Pan fry ham slices in dry cast iron skillet over medium-high heat, 2-3 minutes per side until browned. Remove ham. To the hot skillet with ham drippings, add 1/2 cup strong black coffee, scraping up all the brown bits. Add 1 tbsp butter, swirl to melt. Season with black pepper. Pour this 'redeye' gravy over ham slices. Serve with biscuits, eggs, and grits for a classic Southern country breakfast.",
      historyNotes: "Country ham—salt-cured and aged for months—is the Smithfield ham tradition of Virginia, dating to the 17th century English settlement of the Tidewater region. The redeye gravy name comes from the red 'eye' or circle of grease that forms in the center of the coffee gravy when properly made. Andrew Jackson reportedly ordered his cook to make this gravy after the cook showed up to work with red, hungover eyes.",
      variants: JSON.stringify(["With sorghum molasses (sweet variation)", "Redeye with water instead of coffee (Depression version)", "Biscuit sandwich with ham and redeye", "Modern version with espresso"]),
      sources: JSON.stringify(["Edna Lewis", "Virginia Ham Heritage Trail", "Smithfield Foods History Archives"])
    },
    {
      mealName: "Pot Likker Soup",
      cuisineRegion: "Appalachian / Deep South",
      components: JSON.stringify(["potlikker (cooking liquid from greens)", "field peas", "cornmeal dumplings", "onion", "smoked pork", "turnips", "hot pepper"]),
      recipeText: "Save potlikker (broth) from cooking collard or turnip greens with smoked pork. Bring potlikker to simmer. Add cooked field peas, diced onion, cubed turnips, and any leftover shredded pork. Simmer 20 minutes. For cornmeal dumplings: mix 1 cup cornmeal, 1/2 tsp salt, 1/2 tsp baking powder with enough boiling water to make a stiff dough. Roll into walnut-sized balls and drop into simmering soup. Cover and cook 15 minutes. Serve with hot pepper vinegar on the side.",
      historyNotes: "Potlikker soup exemplifies the profound 'waste nothing' ethic of Appalachian and Southern cooking. The liquid left over from cooking greens—rich with vitamins leached from the leaves—was considered so nourishing that it was given to sick and elderly people. Adding cornmeal dumplings transforms the broth into a complete meal. This dish kept poor farming families alive through hard winters.",
      variants: JSON.stringify(["With dried beans added", "Sweet potato dumplings variation", "With cracklin' cornbread on the side", "Fermented hot pepper vinegar accompaniment"]),
      sources: JSON.stringify(["Ronni Lundy Victuals", "Foxfire Series Vol.2", "Appalachian Food Summit"])
    },
    {
      mealName: "Cracklin' Cornbread",
      cuisineRegion: "Southern United States / Appalachian",
      components: JSON.stringify(["stone-ground cornmeal", "pork cracklings", "buttermilk", "eggs", "baking soda", "salt", "bacon drippings"]),
      recipeText: "Break or chop 1 cup pork cracklings (chicharrones) into smaller pieces. Mix 2 cups stone-ground cornmeal, 1 tsp baking soda, 1 tsp salt. Whisk 2 eggs and 1.5 cups buttermilk. Combine wet and dry ingredients, fold in cracklings. Heat cast iron skillet with 2 tbsp bacon drippings in 450°F oven until smoking. Pour hot fat into batter, stir, pour into skillet. Bake 22-25 minutes until deeply golden and crisp on bottom. The cracklings add pockets of porky richness throughout.",
      historyNotes: "Cracklin' cornbread evolved from the hog-killing traditions of the rural South and Appalachia. After rendering lard from fatback, the crispy leftover bits—cracklings—were folded into cornbread. Hog killings were community events in fall and winter, and cracklin' bread was the celebratory food of the day, shared among neighbors who helped with the work.",
      variants: JSON.stringify(["With jalapeño and cheddar", "Hoecake version (pan-fried)", "With green onions", "Cracklin' biscuits (same concept in biscuit form)"]),
      sources: JSON.stringify(["Sean Brock Heritage", "Edna Lewis A Taste of Country Cooking", "Foxfire Series"])
    },
    {
      mealName: "Persimmon Pudding",
      cuisineRegion: "Indiana / Appalachian / Midwestern United States",
      components: JSON.stringify(["wild American persimmon pulp", "eggs", "sugar", "milk", "cream", "flour", "cinnamon", "nutmeg", "baking soda", "butter"]),
      recipeText: "Process 2 cups fully ripe wild American persimmon pulp through food mill to remove seeds and skins. Beat 3 eggs with 1.5 cups sugar. Add 2 cups whole milk and 1/2 cup cream. Sift together 1 cup flour, 1 tsp baking soda, 1 tsp cinnamon, 1/2 tsp nutmeg, 1/2 tsp salt. Combine wet and dry with persimmon pulp, fold in 4 tbsp melted butter. Pour into buttered 9x13 pan. Bake at 325°F for 55-65 minutes. Center should just barely jiggle. Serve warm with whipped cream.",
      historyNotes: "Wild American persimmon (Diospyros virginiana) must be fully ripe—after a hard frost—or it is intensely astringent. Native Americans showed early settlers how to use this native fruit, and persimmon pudding became a tradition across Indiana, Kentucky, and the broader Midwest. The annual Mitchell, Indiana Persimmon Festival (since 1947) celebrates this Hoosier heritage food.",
      variants: JSON.stringify(["With hickory nuts folded in", "Asian persimmon version (milder, different character)", "Persimmon bread (loaf format)", "Old-fashioned persimmon beer (historical)"]),
      sources: JSON.stringify(["Indiana Persimmon Festival cookbook", "KSU Pawpaw Program fruit guides", "USDA Native Fruits Research"])
    },
    {
      mealName: "Leather Britches Beans",
      cuisineRegion: "Appalachian United States",
      components: JSON.stringify(["dried leather britches beans (string beans dried on the pod)", "smoked ham hock", "onion", "salt", "black pepper", "lard"]),
      recipeText: "Soak leather britches (whole dried green bean pods strung and dried) in water overnight. They will rehydrate slightly but remain leathery. Rinse well. In large pot combine soaked beans with smoked ham hock, quartered onion, 6 cups water. Bring to boil, then simmer 2-4 hours until beans are very tender and the pods have a unique silky texture unlike fresh green beans. Add lard, season generously with salt and black pepper. The beans should have an earthy, rich flavor unlike anything else. Serve with cornbread.",
      historyNotes: "Leather britches—green beans dried on the pod and strung on twine—is a preservation method older than canning, brought to Appalachia by English, Scots-Irish, and German settlers and intertwined with Native American traditions. The beans are strung fresh in summer and hung to dry in the kitchen or on the porch. They develop a unique concentrated flavor through fermentation during drying that cannot be replicated with canned or frozen beans.",
      variants: JSON.stringify(["Combined with soup beans (pinto beans)", "With dried corn (succotash variation)", "Shelly beans (half-dried variant)", "Kraut beans (fermented variation)"]),
      sources: JSON.stringify(["Ronni Lundy Victuals", "Foxfire Book Series", "Appalachian Food Summit"])
    },
    {
      mealName: "Stack Cake",
      cuisineRegion: "Appalachian United States (Eastern Kentucky, Southern West Virginia)",
      components: JSON.stringify(["all-purpose flour", "sorghum molasses", "dried apple filling", "buttermilk", "butter", "eggs", "baking soda", "ginger", "cinnamon", "allspice"]),
      recipeText: "Make dried apple filling: simmer 1 lb dried apples with water, brown sugar, cinnamon, allspice until very thick jam-like consistency. For cake layers: cream 1 cup butter with 1 cup sorghum. Beat in 2 eggs. Sift 4 cups flour with 1 tsp baking soda, 1 tsp ginger, 1/2 tsp each cinnamon, allspice. Alternate adding flour mixture and 3/4 cup buttermilk. The dough will be stiff. Divide into 6-8 portions, press each into greased 9-inch cake pan about 1/4 inch thick. Bake layers at 350°F 10-12 minutes. Stack cooled layers with generous apple filling between each. Refrigerate 24-48 hours—the layers absorb moisture from filling and become cake-like.",
      historyNotes: "Stack cake is the iconic Appalachian wedding cake, born of mountain necessity. Neighbors would each bring a layer of gingerbread-like cake to a wedding, and the hosts would fill between layers with their home-dried apple preserves. The more layers on a bride's stack cake, the more popular and beloved she and her family were in the community. The cake improves dramatically with days of rest as layers absorb the apple filling.",
      variants: JSON.stringify(["With blackberry jam filling", "Dried peach version", "Modern version with more baking powder (fluffier layers)", "Persimmon filling variation"]),
      sources: JSON.stringify(["Ronni Lundy Victuals", "Foxfire Book Series Vol.2", "Appalachian Food Summit", "Mark Sohn Appalachian Home Cooking"])
    }
  ];

  for (const meal of meals) {
    await prisma.meal.create({ data: meal });
  }
  console.log('Meals seeded');

  console.log('All data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

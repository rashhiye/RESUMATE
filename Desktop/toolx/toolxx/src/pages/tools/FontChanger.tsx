import { useState, useEffect } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import { getToolById } from "@/lib/tools";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Search } from "lucide-react";
import { toast } from "sonner";

const tool = getToolById("font-changer")!;

const FONTS = [
  "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Inter",
  "Oswald", "Nunito", "Merriweather", "Playfair Display", "Source Sans 3",
  "Ubuntu", "Rubik", "Noto Sans", "PT Sans", "Work Sans", "Quicksand",
  "Mulish", "Barlow", "Josefin Sans", "Cabin", "DM Sans", "Karla",
  "Libre Baskerville", "Crimson Text", "Bitter", "Arvo", "Lora", "EB Garamond",
  "Cormorant Garamond", "Spectral", "Source Serif 4", "Noto Serif", "PT Serif",
  "Roboto Slab", "Alegreya", "Vollkorn", "Libre Franklin", "Manrope",
  "Outfit", "Space Grotesk", "Sora", "Plus Jakarta Sans", "Figtree",
  "Onest", "Geist", "Lexend", "Overpass", "Exo 2",
  "Titillium Web", "Dosis", "Archivo", "Barlow Condensed", "Fira Sans",
  "Oxygen", "Hind", "Mukta", "Nanum Gothic", "Signika",
  "Abel", "Asap", "Catamaran", "Questrial", "Varela Round",
  "Assistant", "Maven Pro", "IBM Plex Sans", "Red Hat Display", "Urbanist",
  "Pacifico", "Dancing Script", "Lobster", "Caveat", "Satisfy",
  "Great Vibes", "Sacramento", "Kaushan Script", "Parisienne", "Cookie",
  "Courgette", "Playball", "Tangerine", "Allura", "Alex Brush",
  "Amatic SC", "Permanent Marker", "Indie Flower", "Patrick Hand", "Shadows Into Light",
  "Gloria Hallelujah", "Architects Daughter", "Kalam", "Handlee", "Reenie Beanie",
  "Bangers", "Bungee", "Bungee Shade", "Monoton", "Righteous",
  "Orbitron", "Russo One", "Press Start 2P", "Black Ops One", "Creepster",
  "Special Elite", "Cinzel", "Cinzel Decorative", "Marcellus", "Forum",
  "Poiret One", "Jost", "Chivo", "Spartan", "Saira",
  "Encode Sans", "Public Sans", "Commissioner", "Epilogue", "Newsreader",
  "Fraunces", "Bodoni Moda", "Brygada 1918", "Texturina", "Piazzolla",
  "Literata", "Grandstander", "Syne", "Clash Display",
  "Instrument Sans", "General Sans", "Cabinet Grotesk", "Satoshi",
  "Space Mono", "JetBrains Mono", "Fira Code", "Source Code Pro",
  "IBM Plex Mono", "Roboto Mono", "Ubuntu Mono", "Inconsolata",
  // Funny & Novelty fonts
  "Bungee Inline", "Bungee Outline", "Bungee Hairline",
  "Fredericka the Great", "Mystery Quest", "Nosifer", "Eater",
  "Butcherman", "Creepster", "Freckle Face", "Jolly Lodger",
  "Londrina Sketch", "Londrina Shadow", "Londrina Outline",
  "Rammetto One", "Rubik Moonrocks", "Rubik Beastly", "Rubik Glitch",
  "Rubik Wet Paint", "Rubik Burned", "Rubik Distressed",
  "Rubik Vinyl", "Rubik Puddles", "Rubik Storm", "Rubik Spray Paint",
  "Henny Penny", "Faster One", "Plaster", "Sancreek",
  "Metal Mania", "UnifrakturMaguntia", "MedievalSharp", "Pirata One",
  "Trade Winds", "Rye", "Ewert", "Emblema One",
  "Kranky", "Lakki Reddy", "Stalinist One", "Baumans",
  "Flavors", "Fascinate", "Fascinate Inline", "Modak",
  "Boogaloo", "Luckiest Guy", "Chewy", "Fredoka",
  "Bubblegum Sans", "Comic Neue", "Schoolbell", "Coming Soon",
  "Just Another Hand", "Rock Salt", "Homemade Apple", "Waiting for the Sunrise",
];

const FontChanger = () => {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog");
  const [fontSize, setFontSize] = useState(28);
  const [search, setSearch] = useState("");
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  const filteredFonts = FONTS.filter((f) =>
    f.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // Load fonts in batches
    const loadBatch = (fonts: string[]) => {
      const families = fonts.map((f) => `family=${f.replace(/ /g, "+")}`).join("&");
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
      document.head.appendChild(link);
      link.onload = () => {
        setLoadedFonts((prev) => {
          const next = new Set(prev);
          fonts.forEach((f) => next.add(f));
          return next;
        });
      };
    };

    // Load in batches of 20
    for (let i = 0; i < FONTS.length; i += 20) {
      setTimeout(() => loadBatch(FONTS.slice(i, i + 20)), i * 5);
    }
  }, []);

  const copyCSS = (font: string) => {
    navigator.clipboard.writeText(`font-family: '${font}', sans-serif;`);
    toast.success(`Copied CSS for ${font}!`);
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        {/* Controls */}
        <Textarea
          placeholder="Type your preview text..."
          className="min-h-[80px] bg-muted/50 border-glass-border resize-none text-base"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search fonts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-muted/50 border-glass-border pl-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground whitespace-nowrap">Size: {fontSize}px</label>
            <input
              type="range"
              min={12}
              max={72}
              value={fontSize}
              onChange={(e) => setFontSize(+e.target.value)}
              className="w-32 accent-primary"
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{filteredFonts.length} fonts available • Click "Copy CSS" to use in your project</p>

        {/* Font list */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {filteredFonts.map((font) => (
            <div
              key={font}
              className="glass rounded-xl p-5 hover:bg-glass-hover transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">{font}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyCSS(font)}
                  className="text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" /> Copy CSS
                </Button>
              </div>
              <p
                style={{
                  fontFamily: `'${font}', sans-serif`,
                  fontSize: `${fontSize}px`,
                  lineHeight: 1.4,
                }}
                className="break-words text-foreground"
              >
                {text || "The quick brown fox jumps over the lazy dog"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default FontChanger;

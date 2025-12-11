import { useEffect, useRef, useState } from "react";
import { Atom, RotateCcw, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";

// Molecule data with PDB IDs for 3D visualization
const moleculePDBData: Record<string, string> = {
  metformin: `
HETATM    1  N1  MET A   1       0.000   0.000   0.000  1.00  0.00           N
HETATM    2  C1  MET A   1       1.340   0.000   0.000  1.00  0.00           C
HETATM    3  N2  MET A   1       2.010   1.170   0.000  1.00  0.00           N
HETATM    4  N3  MET A   1       2.010  -1.170   0.000  1.00  0.00           N
HETATM    5  C2  MET A   1      -0.670   1.340   0.000  1.00  0.00           C
HETATM    6  C3  MET A   1      -0.670  -1.340   0.000  1.00  0.00           C
HETATM    7  N4  MET A   1       3.350   1.170   0.000  1.00  0.00           N
HETATM    8  C4  MET A   1       4.020   2.510   0.000  1.00  0.00           C
HETATM    9  C5  MET A   1       4.020  -0.000   0.000  1.00  0.00           C
CONECT    1    2    5    6
CONECT    2    1    3    4
CONECT    3    2    7
CONECT    4    2
CONECT    5    1
CONECT    6    1
CONECT    7    3    8    9
CONECT    8    7
CONECT    9    7
END`,
  aspirin: `
HETATM    1  C1  ASP A   1       0.000   0.000   0.000  1.00  0.00           C
HETATM    2  C2  ASP A   1       1.390   0.000   0.000  1.00  0.00           C
HETATM    3  C3  ASP A   1       2.090   1.210   0.000  1.00  0.00           C
HETATM    4  C4  ASP A   1       1.390   2.420   0.000  1.00  0.00           C
HETATM    5  C5  ASP A   1       0.000   2.420   0.000  1.00  0.00           C
HETATM    6  C6  ASP A   1      -0.700   1.210   0.000  1.00  0.00           C
HETATM    7  C7  ASP A   1      -0.700  -1.340   0.000  1.00  0.00           C
HETATM    8  O1  ASP A   1      -0.100  -2.420   0.000  1.00  0.00           O
HETATM    9  O2  ASP A   1      -2.010  -1.340   0.000  1.00  0.00           O
HETATM   10  O3  ASP A   1       2.090  -1.210   0.000  1.00  0.00           O
HETATM   11  C8  ASP A   1       3.490  -1.210   0.000  1.00  0.00           C
HETATM   12  O4  ASP A   1       4.090  -2.280   0.000  1.00  0.00           O
HETATM   13  C9  ASP A   1       4.190   0.000   0.000  1.00  0.00           C
CONECT    1    2    6    7
CONECT    2    1    3   10
CONECT    3    2    4
CONECT    4    3    5
CONECT    5    4    6
CONECT    6    1    5
CONECT    7    1    8    9
CONECT   10    2   11
CONECT   11   10   12   13
END`,
  ivermectin: `
HETATM    1  C1  IVE A   1       0.000   0.000   0.000  1.00  0.00           C
HETATM    2  C2  IVE A   1       1.540   0.000   0.000  1.00  0.00           C
HETATM    3  C3  IVE A   1       2.310   1.330   0.000  1.00  0.00           C
HETATM    4  O1  IVE A   1       3.720   1.330   0.000  1.00  0.00           O
HETATM    5  C4  IVE A   1       4.490   2.660   0.000  1.00  0.00           C
HETATM    6  C5  IVE A   1       5.900   2.660   0.000  1.00  0.00           C
HETATM    7  C6  IVE A   1       6.670   3.990   0.000  1.00  0.00           C
HETATM    8  O2  IVE A   1       8.080   3.990   0.000  1.00  0.00           O
HETATM    9  C7  IVE A   1      -0.770  -1.330   0.000  1.00  0.00           C
HETATM   10  C8  IVE A   1      -2.180  -1.330   0.000  1.00  0.00           C
HETATM   11  O3  IVE A   1      -2.950  -2.660   0.000  1.00  0.00           O
HETATM   12  C9  IVE A   1      -2.950   0.000   0.000  1.00  0.00           C
CONECT    1    2    9
CONECT    2    1    3
CONECT    3    2    4
CONECT    4    3    5
CONECT    5    4    6
CONECT    6    5    7
CONECT    7    6    8
CONECT    9    1   10
CONECT   10    9   11   12
END`,
};

interface MoleculeViewerProps {
  moleculeName: string;
  className?: string;
}

export default function MoleculeViewer({ moleculeName, className = "" }: MoleculeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const loadViewer = async () => {
      setIsLoading(true);
      
      // Dynamic import of 3Dmol
      try {
        const $3Dmol = await import("3dmol");
        
        if (containerRef.current && !viewerRef.current) {
          // Clear container
          containerRef.current.innerHTML = '';
          
          // Create viewer
          const viewer = $3Dmol.createViewer(containerRef.current, {
            backgroundColor: "transparent",
            antialias: true,
          });
          
          viewerRef.current = viewer;
          
          // Get PDB data for molecule
          const pdbKey = moleculeName.toLowerCase().replace(/\s+/g, '');
          const pdbData = moleculePDBData[pdbKey] || moleculePDBData.metformin;
          
          // Add model
          viewer.addModel(pdbData, "pdb");
          
          // Style the molecule
          viewer.setStyle({}, {
            stick: { 
              radius: 0.15,
              colorscheme: "Jmol"
            },
            sphere: { 
              radius: 0.4,
              colorscheme: "Jmol"
            }
          });
          
          // Center and zoom
          viewer.zoomTo();
          viewer.render();
          
          // Start rotation animation
          const animate = () => {
            if (viewerRef.current) {
              viewerRef.current.rotate(0.5, 'y');
              viewerRef.current.render();
            }
            requestAnimationFrame(animate);
          };
          animate();
        }
      } catch (error) {
        console.error("Error loading 3Dmol:", error);
      }
      
      setIsLoading(false);
    };

    loadViewer();

    return () => {
      if (viewerRef.current) {
        viewerRef.current = null;
      }
    };
  }, [moleculeName]);

  const handleZoomIn = () => {
    if (viewerRef.current) {
      viewerRef.current.zoom(1.2);
      viewerRef.current.render();
    }
  };

  const handleZoomOut = () => {
    if (viewerRef.current) {
      viewerRef.current.zoom(0.8);
      viewerRef.current.render();
    }
  };

  const handleReset = () => {
    if (viewerRef.current) {
      viewerRef.current.zoomTo();
      viewerRef.current.render();
    }
  };

  return (
    <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 ${className}`}>
      {/* Controls */}
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Molecule label */}
      <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-sm">
        <span className="text-sm font-medium text-emerald-400">{moleculeName}</span>
      </div>

      {/* 3D Viewer Container */}
      <div
        ref={containerRef}
        className="w-full h-full min-h-[300px]"
        style={{ position: "relative" }}
      />

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <div className="text-center">
            <Atom className="w-12 h-12 text-emerald-500 mx-auto animate-pulse mb-3" />
            <p className="text-white/70 text-sm">Loading 3D structure...</p>
          </div>
        </div>
      )}

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </div>
  );
}

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { VideoCard } from "@/components/dashboard/VideoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Search, Filter, Grid, List } from "lucide-react";

const allVideos = [
  {
    title: "Cómo escalar tu startup en 2024",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=225&fit=crop",
    duration: "12:34",
    views: "15.2K",
    likes: "1.2K",
    status: "published" as const,
    platform: "YouTube",
  },
  {
    title: "5 errores que cometen los emprendedores",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop",
    duration: "8:45",
    views: "8.7K",
    likes: "890",
    status: "published" as const,
    platform: "Instagram",
  },
  {
    title: "Tips de productividad para equipos remotos",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=225&fit=crop",
    duration: "15:20",
    views: "0",
    likes: "0",
    status: "scheduled" as const,
    platform: "YouTube",
  },
  {
    title: "Detrás de cámaras - Sesión de fotos",
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=225&fit=crop",
    duration: "0:58",
    views: "0",
    likes: "0",
    status: "draft" as const,
    platform: "TikTok",
  },
  {
    title: "Marketing en redes sociales 101",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop",
    duration: "18:22",
    views: "22.1K",
    likes: "2.3K",
    status: "published" as const,
    platform: "YouTube",
  },
  {
    title: "Tendencias de diseño 2024",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
    duration: "10:15",
    views: "5.4K",
    likes: "456",
    status: "published" as const,
    platform: "Instagram",
  },
];

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <MainLayout 
      title="Mis Videos" 
      subtitle="Gestiona y organiza todo tu contenido de video"
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64 bg-secondary border-0"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <Button className="gradient-accent shadow-accent-glow">
              <Upload className="w-4 h-4 mr-2" />
              Subir Video
            </Button>
          </div>
        </div>

        {/* Videos Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {allVideos
            .filter(video => 
              video.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
        </div>

        {/* Empty State */}
        {allVideos.filter(video => 
          video.title.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron videos
            </h3>
            <p className="text-muted-foreground">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Videos;

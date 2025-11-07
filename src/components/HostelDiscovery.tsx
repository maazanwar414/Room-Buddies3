import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Wifi, Car, Coffee, Heart, Share } from "lucide-react";
import { useState } from "react";
import hostel1 from "@/assets/hostel-1.jpg";
import hostel2 from "@/assets/hostel-2.jpg";

interface Hostel {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  priceRange: string;
  amenities: string[];
  description: string;
  availableRooms: number;
  roommateMatches: number;
}

const sampleHostels: Hostel[] = [
  {
    id: "1",
    name: "Harmony House Co-Living",
    image: hostel1,
    rating: 4.8,
    reviewCount: 124,
    distance: "0.3 miles away",
    priceRange: "$800-1200/month",
    amenities: ["Wifi", "Parking", "Gym", "Cafe"],
    description: "Modern co-living space designed specifically for women professionals. Features shared kitchens, study areas, and community events.",
    availableRooms: 3,
    roommateMatches: 8
  },
  {
    id: "2",
    name: "The Nest Women's Hostel",
    image: hostel2,
    rating: 4.7,
    reviewCount: 89,
    distance: "0.7 miles away", 
    priceRange: "$600-900/month",
    amenities: ["Wifi", "Cafe", "Garden", "Library"],
    description: "Cozy women-only accommodation with a focus on safety and community. Perfect for students and young professionals.",
    availableRooms: 5,
    roommateMatches: 12
  }
];

const HostelDiscovery = () => {
  const [savedHostels, setSavedHostels] = useState<string[]>([]);

  const toggleSaved = (hostelId: string) => {
    setSavedHostels(prev => 
      prev.includes(hostelId) 
        ? prev.filter(id => id !== hostelId)
        : [...prev, hostelId]
    );
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Discover Perfect Places</h2>
          <p className="text-xl text-muted-foreground">
            Find hostels and co-living spaces with potential roommates nearby
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            <MapPin className="w-3 h-3 mr-1" />
            Near Me
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            <Users className="w-3 h-3 mr-1" />
            Most Matches
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            <Star className="w-3 h-3 mr-1" />
            Highest Rated
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            Women Only
          </Badge>
        </div>

        {/* Hostel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sampleHostels.map((hostel) => (
            <Card key={hostel.id} className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300">
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={hostel.image} 
                  alt={hostel.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
                    onClick={() => toggleSaved(hostel.id)}
                  >
                    <Heart className={`w-4 h-4 ${savedHostels.includes(hostel.id) ? 'text-primary fill-primary' : 'text-foreground'}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                </div>

                {/* Availability Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-success text-white">
                    {hostel.availableRooms} rooms available
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold">{hostel.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{hostel.rating}</span>
                    <span className="text-muted-foreground">({hostel.reviewCount})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hostel.distance}
                  </div>
                  <div className="font-medium text-foreground">
                    {hostel.priceRange}
                  </div>
                </div>

                <p className="text-foreground mb-4 text-sm leading-relaxed">
                  {hostel.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hostel.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity === "Wifi" && <Wifi className="w-3 h-3 mr-1" />}
                      {amenity === "Parking" && <Car className="w-3 h-3 mr-1" />}
                      {amenity === "Cafe" && <Coffee className="w-3 h-3 mr-1" />}
                      {amenity}
                    </Badge>
                  ))}
                </div>

                {/* Roommate Matches */}
                <div className="flex items-center justify-between mb-4 p-3 bg-accent-soft rounded-lg">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-accent mr-2" />
                    <span className="text-sm font-medium">
                      {hostel.roommateMatches} potential roommates here
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-accent hover:text-accent-foreground">
                    View Matches
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="hero" className="flex-1">
                    Book Tour
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Hostels
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HostelDiscovery;
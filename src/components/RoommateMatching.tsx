import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MessageCircle, Star, MapPin, GraduationCap, Coffee } from "lucide-react";
import { useState } from "react";
import profile1 from "@/assets/profile-1.jpg";
import profile2 from "@/assets/profile-2.jpg";
import profile3 from "@/assets/profile-3.jpg";

interface Roommate {
  id: string;
  name: string;
  age: number;
  image: string;
  bio: string;
  interests: string[];
  location: string;
  matchPercentage: number;
  verified: boolean;
  badges: string[];
}

const sampleRoommates: Roommate[] = [
  {
    id: "1",
    name: "Ujjwal Agarwal",
    age: 19,
    image: profile1,
    bio: "Marketing professional who loves cooking and yoga. Looking for a clean, friendly roommate to share a cozy apartment near downtown.",
    interests: ["Cooking", "Yoga", "Reading", "Movies"],
    location: "Downtown Delhi, 0.5 km",
    matchPercentage: 94,
    verified: true,
    badges: ["Early Bird", "Clean", "Social"]
  },
  {
    id: "2", 
    name: "Himanshi Agarwal",
    age: 19,
    image: profile2,
    bio: "Graduate student studying environmental science. Quiet, studious, but enjoys weekend adventures and coffee shop hangouts.",
    interests: ["Hiking", "Coffee", "Sustainability", "Art"],
    location: "University Area, 1.2 km",
    matchPercentage: 89,
    verified: true,
    badges: ["Student", "Eco-Friendly", "Adventurous"]
  },
  {
    id: "3",
    name: "Pooja Kumari",
    age: 20,
    image: profile2,
    bio: "Software engineer who works remotely. Love plants, board games, and having deep conversations over tea.",
    interests: ["Gaming", "Plants", "Tech", "Tea"],
    location: "Tech Hub, 0.8 km",
    matchPercentage: 92,
    verified: true,
    badges: ["Remote Worker", "Plant Parent", "Gamer"]
  },
    {
    id: "4",
    name: "Maaz Anwar",
    age: 19,
    image: profile3,
    bio: "Software engineer who works remotely. Quiet, studious, and having deep conversations over tea.",
    interests: ["Cooking", "Yoga", "Tech", "Tea"],
    location: "University Area, 0.8 km",
    matchPercentage: 87,
    verified: true,
    badges: ["Student", "Remote Worker", "Interactive"]
  }
];

const RoommateMatching = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);

  const currentRoommate = sampleRoommates[currentIndex];

  const handleSwipe = (liked: boolean) => {
    if (liked) {
      setMatches([...matches, currentRoommate.id]);
    }
    
    if (currentIndex < sampleRoommates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  if (!currentRoommate) return null;

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Matches</h2>
          <p className="text-muted-foreground">Swipe right to connect, left to pass</p>
          {matches.length > 0 && (
            <Badge variant="secondary" className="mt-2">
              {matches.length} matches so far!
            </Badge>
          )}
        </div>

        <Card className="relative overflow-hidden shadow-elevated hover:shadow-card transition-shadow duration-300">
          {/* Match Percentage */}
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-success text-white">
              <Star className="w-3 h-3 mr-1" />
              {currentRoommate.matchPercentage}% match
            </Badge>
          </div>

          {/* Profile Image */}
          <div className="relative h-96 overflow-hidden">
            <img 
              src={currentRoommate.image} 
              alt={currentRoommate.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Verified Badge */}
            {currentRoommate.verified && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-trust text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-bold">{currentRoommate.name}</h3>
              <span className="text-lg text-muted-foreground">{currentRoommate.age}</span>
            </div>

            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{currentRoommate.location}</span>
            </div>

            <p className="text-foreground mb-4 leading-relaxed">
              {currentRoommate.bio}
            </p>

            {/* Personality Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentRoommate.badges.map((badge, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Interests */}
            <div className="space-y-2 mb-6">
              <h4 className="font-medium text-sm text-muted-foreground">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {currentRoommate.interests.map((interest, index) => (
                  <Badge key={index} className="bg-accent-soft text-accent-foreground">
                    {interest === "Coffee" && <Coffee className="w-3 h-3 mr-1" />}
                    {interest === "Student" && <GraduationCap className="w-3 h-3 mr-1" />}
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full border-2 hover:border-destructive hover:bg-destructive/10"
                onClick={() => handleSwipe(false)}
              >
                <X className="w-6 h-6 text-destructive" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full border-2 hover:border-trust hover:bg-trust/10"
              >
                <MessageCircle className="w-5 h-5 text-trust" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full border-2 hover:border-success hover:bg-success/10"
                onClick={() => handleSwipe(true)}
              >
                <Heart className="w-6 h-6 text-success" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {sampleRoommates.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoommateMatching;
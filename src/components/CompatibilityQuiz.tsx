import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Question {
  id: string;
  type: "radio" | "checkbox" | "scale";
  question: string;
  options?: string[];
  category: string;
}

const compatibilityQuestions: Question[] = [
  {
    id: "sleep-schedule",
    type: "radio", 
    question: "What's your ideal sleep schedule?",
    options: ["Early bird (9 PM - 6 AM)", "Regular (11 PM - 7 AM)", "Night owl (1 AM - 9 AM)", "Irregular/Shift work"],
    category: "Lifestyle"
  },
  {
    id: "cleanliness",
    type: "scale",
    question: "How important is cleanliness to you? (1-5 scale)",
    category: "Living Habits"
  },
  {
    id: "social-level",
    type: "radio",
    question: "How social are you at home?",
    options: ["Love hosting friends regularly", "Occasional hangouts", "Prefer quiet time", "Very private person"],
    category: "Social"
  },
  {
    id: "cooking-habits",
    type: "radio",
    question: "What are your cooking preferences?",
    options: ["Love cooking and sharing meals", "Cook for myself mostly", "Order food frequently", "Minimal cooking"],
    category: "Food & Kitchen"
  },
  {
    id: "noise-tolerance",
    type: "radio",
    question: "How do you handle noise?",
    options: ["Very sensitive to noise", "Moderate tolerance", "Noise doesn't bother me", "I'm usually the noisy one"],
    category: "Environment"
  },
  {
    id: "sharing-preferences",
    type: "checkbox",
    question: "What are you comfortable sharing?",
    options: ["Kitchen utensils", "Cleaning supplies", "Food items", "Personal care products", "Clothes/accessories"],
    category: "Sharing"
  },
  {
    id: "work-style",
    type: "radio",
    question: "What's your work situation?",
    options: ["Work from home regularly", "9-5 office job", "Irregular schedule", "Student with flexible hours"],
    category: "Work & Study"
  },
  {
    id: "guests-policy",
    type: "radio",
    question: "How do you feel about guests?",
    options: ["Love having people over", "Guests are fine with notice", "Prefer minimal guests", "No guests please"],
    category: "Social"
  }
];

const CompatibilityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentQuestion + 1) / compatibilityQuestions.length) * 100;
  const question = compatibilityQuestions[currentQuestion];

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < compatibilityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderQuestionInput = () => {
    const answer = answers[question.id];

    switch (question.type) {
      case "radio":
        return (
          <RadioGroup value={answer} onValueChange={handleAnswer} className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`checkbox-${index}`}
                  checked={answer?.includes(option)}
                  onCheckedChange={(checked) => {
                    const newAnswer = answer || [];
                    if (checked) {
                      handleAnswer([...newAnswer, option]);
                    } else {
                      handleAnswer(newAnswer.filter((item: string) => item !== option));
                    }
                  }}
                />
                <Label htmlFor={`checkbox-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case "scale":
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={answer === rating ? "hero" : "outline"}
                  size="lg"
                  className="flex-1"
                  onClick={() => handleAnswer(rating)}
                >
                  {rating}
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <div className="container mx-auto px-6 py-16">
        <Card className="max-w-2xl mx-auto p-8 text-center shadow-elevated">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Compatibility Profile Complete!</h2>
            <p className="text-muted-foreground text-lg">
              We've analyzed your preferences and are ready to find your perfect roommate matches.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-accent-soft rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Compatibility Score</div>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">12</div>
                <div className="text-sm text-muted-foreground">Potential Matches</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="hero" size="lg" className="w-full">
              View My Matches
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Retake Quiz
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4">{question.category}</Badge>
          <h2 className="text-3xl font-bold mb-4">Compatibility Assessment</h2>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {compatibilityQuestions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 shadow-card">
          <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
          
          <div className="mb-8">
            {renderQuestionInput()}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!answers[question.id]}
            >
              {currentQuestion === compatibilityQuestions.length - 1 ? "Complete" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Answer Summary */}
        {Object.keys(answers).length > 0 && (
          <Card className="mt-6 p-6 bg-muted/50">
            <h4 className="font-medium mb-3">Your Answers So Far:</h4>
            <div className="space-y-2 text-sm">
              {Object.entries(answers).map(([questionId, answer]) => {
                const q = compatibilityQuestions.find(q => q.id === questionId);
                return (
                  <div key={questionId} className="flex justify-between">
                    <span className="text-muted-foreground">{q?.category}:</span>
                    <span className="font-medium">
                      {Array.isArray(answer) ? answer.join(", ") : answer}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompatibilityQuiz;
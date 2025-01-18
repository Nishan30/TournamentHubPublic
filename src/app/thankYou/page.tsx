"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, ChevronRight } from "lucide-react"

export default function ThankYouPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Trophy Icon with Animation */}
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="mb-6"
              >
                <Trophy className="w-20 h-20 text-yellow-500" />
              </motion.div>

              {/* Success Message */}
              <h1 className="text-4xl font-bold tracking-tight">
                Registration Complete!
              </h1>
              
              <p className="text-gray-600 text-lg max-w-md">
                Thank you for registering for the tournament. We're excited to have you on board!
              </p>

              {/* Next Steps */}
              <div className="bg-gray-50 p-6 rounded-lg w-full">
                <h2 className="font-semibold text-gray-900 mb-3">Next Steps:</h2>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                    Check your email for confirmation details
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                    Join our Discord community for updates
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                    Complete your profile for better tournament experience
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full mt-6">
                <Button 
                  variant="default"
                  className="flex-1"
                  onClick={() => router.push('/signin?accountType=Participant')}
                >
                  Sign In to Dashboard
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push('/')}
                >
                  View Other Tournaments
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
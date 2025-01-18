"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format } from "date-fns";
import {
  Trophy,
  Users,
  Calendar,
  MapPin,
  Medal,
  Target,
  Timer,
  Award,
  Eye,
  DollarSign,
} from "lucide-react";
import { Match, ITournament, Standing } from "@/types/tournament";
import { StandingsTable } from "@/components/standingTable/StandingsTable";
import { useTournament } from "@/context/tournamentContext";
import { fetchTournamentData } from "@/services/tournament/tournament";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { fetchMatchesByTournamentId } from "@/services/tournament/match";
import { calculateStandings } from "@/utils/standings";
import { SidebarLayoutOrganizer } from "@/components/common/sidebarOrganizer";

export default function TournamentReports() {
  const user = useUser();
  const router = useRouter();
  const { activeTournament } = useTournament();
  const [tournament, setTournamentData] = useState<ITournament | null>(null);
  const [matches, setMatchesData] = useState<Match[] | null>(null);
  const [standings, setStandingData] = useState<Standing[] | null>(null);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    if (!user.user || !activeTournament?.id) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        router.push(
          `/signin?redirect=${encodeURIComponent(
            currentPath
          )}&accountType=Organizer`
        );
      }
      return;
    }

    const fetchData = async () => {
      if (activeTournament?.id) {
        const data = await fetchTournamentData(activeTournament.id);
        setTournamentData(data);
      }
    };

    const fetchMatches = async () => {
      if (activeTournament?.id) {
        const data: Match[] = await fetchMatchesByTournamentId(
          activeTournament.id as string
        );
        const standingData: Standing[] = calculateStandings(data);
        setMatchesData(data);
        setStandingData(standingData);
      }
    };

    fetchData();
    fetchMatches();
  }, [user.user, router, activeTournament?.id]);

  const [activeTab, setActiveTab] = useState("introduction");

  if (!tournament || !matches || !standings) {
    return <div>Loading...</div>;
  }

  // Calculate statistics
  const totalMatches = matches.length;
  const completedMatches = matches.filter(
    (match) => match.status === "completed"
  ).length;
  const upcomingMatches = matches.filter(
    (match) => match.status === "scheduled"
  ).length;

  // Calculate tournament duration in days
  const durationInDays = Math.ceil(
    (new Date(tournament.endDate).getTime() -
      new Date(tournament.startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Get top 3 teams
  const topTeams = standings
    ? [...standings].sort((a, b) => b.points - a.points).slice(0, 3)
    : [];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/7 bg-gray-100">
        <SidebarLayoutOrganizer activeItem="Overview" />
      </aside>

      {/* Main Content */}
      <div className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{tournament?.name}</h1>
          <p className="text-muted-foreground">
            {tournament?.startDate &&
              format(new Date(tournament.startDate), "MMMM d, yyyy")}{" "}
            -{" "}
            {tournament?.endDate &&
              format(new Date(tournament.endDate), "MMMM d, yyyy")}
          </p>
        </div>

        {/* Rest of your content */}
        <Tabs
          defaultValue="introduction"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-4 bg-background p-1 rounded-lg">
            <TabsTrigger
              value="introduction"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Introduction
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="metrics"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Key Metrics
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Results
            </TabsTrigger>
          </TabsList>

        <TabsContent value="introduction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Overview</CardTitle>
              <CardDescription>
                Essential tournament information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Tournament Dates</p>
                      <p className="text-sm text-muted-foreground">
                        {tournament?.startDate &&
                          format(
                            new Date(tournament.startDate),
                            "MMMM d, yyyy"
                          )}{" "}
                        -{" "}
                        {tournament?.endDate &&
                          format(
                            new Date(tournament.endDate),
                            "MMMM d, yyyy"
                          )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {tournament?.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Tournament Type</p>
                      <p className="text-sm text-muted-foreground">
                        {tournament?.tournamentType}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Tournament Objective</h3>
                  <p className="text-muted-foreground">
                    {tournament?.description}
                  </p>
                  <h3 className="font-semibold">Rules</h3>
                  <p className="text-muted-foreground">{tournament?.rules}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid gap-4 grid-cols-4">
            <Card className="h-[140px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Duration</CardTitle>
                <Timer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{durationInDays} days</div>
              </CardContent>
            </Card>
            <Card className="h-[140px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Participants
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tournament?.playerCount}
                </div>
              </CardContent>
            </Card>
            <Card className="h-[140px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMatches}</div>
              </CardContent>
            </Card>
            <Card className="h-[140px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Matches Completed
                </CardTitle>
                <Medal className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedMatches}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tournament Progress</CardTitle>
              <CardDescription>
                Overview of matches and participation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={standings.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="teamName" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="played" name="Matches Played" fill="#8884d8" />
                    <Bar dataKey="won" name="Matches Won" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4 grid-cols-3">
            <Card className="h-[140px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Participants
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {tournament?.playerCount}
                </div>
                <p className="text-xs text-muted-foreground">
                  {tournament?.isIndividual ? "Individual" : "Team"} Tournament
                </p>
              </CardContent>
            </Card>
            <Card className="h-[140px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Spectators</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  Live and Online Combined
                </p>
              </CardContent>
            </Card>
            <Card className="h-[140px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prize Pool</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$10,000</div>
                <p className="text-xs text-muted-foreground">
                  Total Prize Distribution
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Match Statistics</CardTitle>
              <CardDescription>
                Detailed breakdown of tournament matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="h-[400px]">
                  <h3 className="text-lg font-semibold mb-4">
                    Match Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Completed",
                            value: completedMatches,
                          },
                          {
                            name: "Upcoming",
                            value: upcomingMatches,
                          },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[400px]">
                  <h3 className="text-lg font-semibold mb-4">
                    Goals Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={standings.slice(0, 5)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="teamName" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar
                        dataKey="goalsFor"
                        name="Goals Scored"
                        fill="#82ca9d"
                      />
                      <Bar
                        dataKey="goalsAgainst"
                        name="Goals Conceded"
                        fill="#8884d8"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Winners</CardTitle>
              <CardDescription>
                Final standings and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-3">
                  {topTeams.map((team, index) => (
                    <Card key={team.teamName} className="h-[200px]">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award
                            className={`h-5 w-5 ${
                              index === 0
                                ? "text-yellow-500"
                                : index === 1
                                ? "text-gray-400"
                                : "text-amber-600"
                            }`}
                          />
                          {index === 0
                            ? "Champion"
                            : index === 1
                            ? "Runner-up"
                            : "Third Place"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold mb-2">
                          {team.teamName}
                        </div>
                        <div className="space-y-1 text-sm">
                          <p>Points: {team.points}</p>
                          <p>
                            Record: {team.won}W - {team.drawn}D - {team.lost}L
                          </p>
                          <p>Goals: {team.goalsFor}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Complete Standings
                  </h3>
                  {tournament?.tournamentType === "league" && (
                    <div className="mt-8">
                      <StandingsTable matches={matches} />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  );
}
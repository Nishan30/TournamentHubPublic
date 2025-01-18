"use server";

import connectToDatabase from "@/lib/mongodb";
import userModel, { IUser } from '@/models/userModel';
import tournamentModel from "@/models/tournamentModel";
import Participant from "@/models/participantModel";
import ParticipantData from "@/models/participantDataModel";
import ArbriterData from "@/models/arbriterDataModel";
import Arbriter from "@/models/arbriterModel";
import waitlistModel from "@/models/waitlistModel";

let savedTournamentId: string | null = null;

export const saveTournament = async (
  name_: string | null,
  organizerName_ : string | null | undefined,
  email_: string | null | undefined,
  description_: string | null,
  rules_: string | null,
  location_: string | null,
  playerCount_:string | null,
  tournamentType_: string | null,
  hasPlayerList_: boolean | null,
  publicTournament_: boolean | null,
  needsArbriter_: boolean | null,
  isIndividual_: boolean | null,
  paymentSystem_: boolean | null,
  startDate_: Date | null,
  endDate_: Date | null
 ) => {
  await connectToDatabase();
  
    try {
      const tournament = await tournamentModel.create({
        name: name_,
        organizerName: organizerName_,
        email: email_,
        description: description_,
        rules: rules_,
        location: location_,
        playerCount: playerCount_,
        tournamentType: tournamentType_,
        hasPlayerList: hasPlayerList_,
        publicTournament:publicTournament_,
        needsArbriter: needsArbriter_,
        isIndividual: isIndividual_,
        paymentSystem: paymentSystem_,
        startDate: startDate_,
        endDate: endDate_,
        participant: null,
        arbriter: null,
      });
      
      console.log('Tournament saved to MongoDB');
      savedTournamentId = tournament._id.toString();
      return savedTournamentId;
    } catch (error) {
      console.error('Error saving tournament to MongoDB:', error);
    }
  };

  export const deleteTournament = async (id: string): Promise<void> => {
    await connectToDatabase();
  
    try {
      const deletedTournament = await tournamentModel.findByIdAndDelete(id);
  
      if (deletedTournament) {
        console.log(`Tournament with ID ${id} deleted successfully`);
      } else {
        console.error(`Tournament with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting tournament:', error);
    }
  };
  
  export const updateTournament = async (
    id: string,
    updatedData: Partial<{
      name: string;
      organizerName: string;
      email: string;
      description: string;
      rules: string;
      location: string;
      playerCount: string;
      tournamentType: string;
      hasPlayerList: boolean;
      publicTournament: boolean,
      needsArbriter: boolean;
      isIndividual: boolean;
      paymentSystem: boolean;
      startDate: Date;
      endDate: Date;
    }>
  ): Promise<void> => {
    await connectToDatabase();
  
    try {
      const updatedTournament = await tournamentModel.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (updatedTournament) {
        console.log(`Tournament with ID ${id} updated successfully`);
      } else {
        console.error(`Tournament with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Error updating tournament:', error);
    }
  };
  

  export const signIn = async (name_:string|null|undefined,email_:string|null|undefined,image_:string|null|undefined): Promise<IUser>=> {
    await connectToDatabase();
    const user = await userModel.create({
      name: name_,
      email: email_,
      image: image_ || ''  // Provide a default empty string if image is null or undefined
    });
    return user; 
  }

  export const saveParticipant = async (newParticipantData: {
    name: boolean | null;
    email: boolean | null;
    questions: string;
    rules: string;
    walletAddress: boolean | null;
    paymentDetails: boolean | null;
    entryFeeDetails: boolean | null;
    phoneNumber: boolean | null;
    individual: boolean | null,
    formDeadline: Date | null;
  },id:string | null | undefined): Promise<void> => {
    await connectToDatabase();
    
    const {
      name,
      email,
      questions,
      rules,
      walletAddress,
      paymentDetails,
      entryFeeDetails,
      phoneNumber,
      individual,
      formDeadline,
    } = newParticipantData;
  
    const newParticipant = new Participant({
      name: name,
      email: email,
      questions,
      rules,
      walletAddress: walletAddress,
      paymentDetails: paymentDetails,
      entryFeeDetails: entryFeeDetails,
      phoneNumber: phoneNumber,
      individual: individual,
      formDeadline: formDeadline,
    });
  
    try {
      await newParticipant.save();
      const tournament = await tournamentModel.findById(id);
  
      if (tournament) {
        tournament.participant = newParticipant;
        await tournament.save();
        console.log('Participant added to the tournament');
      } else {
        console.error('Tournament not found');
      }
    } catch (error) {
      console.error('Error saving participant:', error);
    }
  };

  export const deleteParticipant = async (id: string): Promise<void> => {
    await connectToDatabase();
  
    try {
      const deletedParticipant = await Participant.findByIdAndDelete(id);
  
      if (deletedParticipant) {
        console.log(`Participant with ID ${id} deleted successfully`);
      } else {
        console.error(`Participant with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting participant:', error);
    }
  };

  export const updateParticipant = async (
    id: string,
    updatedData: Partial<{
      name: boolean;
      email: boolean;
      questions: string;
      walletAddress: boolean;
      paymentDetails: boolean;
      entryFeeDetails: boolean;
      phoneNumber: boolean;
      individual: boolean;
      formDeadline: Date;
    }>
  ): Promise<void> => {
    await connectToDatabase();
  
    try {
      const updatedParticipant = await Participant.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (updatedParticipant) {
        console.log(`Participant with ID ${id} updated successfully`);
      } else {
        console.error(`Participant with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Error updating participant:', error);
    }
  };

  export const saveArbriter = async (newArbriterData: {
    name: boolean | null;
    email: boolean | null;
    questions: string;
    walletAddress: boolean | null;
    paymentDetails: boolean | null;
    phoneNumber: boolean | null;
    formDeadline: Date | null;
  },id:string | null | undefined): Promise<void> => {
    await connectToDatabase();
    
    const {
      name,
      email,
      questions,
      walletAddress,
      paymentDetails,
      phoneNumber,
      formDeadline,
    } = newArbriterData;
  
    const newArbriter= new Arbriter({
      name: name,
      email: email,
      questions,
      walletAddress: walletAddress,
      paymentDetails: paymentDetails,
      phoneNumber: phoneNumber,
      formDeadline: formDeadline,
    });
  
    try {
      await newArbriter.save();
      const tournament = await tournamentModel.findById(id);
  
      if (tournament) {
        tournament.arbriter = newArbriter;
        await tournament.save();
        console.log('Arbriter added to the tournament');
      } else {
        console.error('Tournament not found');
      }
    } catch (error) {
      console.error('Error saving participant:', error);
    }
  };

  export const deleteArbiter = async (id: string): Promise<void> => {
    await connectToDatabase();
  
    try {
      const deletedArbiter = await Arbriter.findByIdAndDelete(id);
  
      if (deletedArbiter) {
        console.log(`Arbiter with ID ${id} deleted successfully`);
      } else {
        console.error(`Arbiter with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Error deleting arbiter:', error);
    }
  };

  export const updateArbiter = async (
    id: string,
    updatedData: Partial<{
      name: boolean;
      email: boolean;
      phoneNumber: boolean;
      walletAddress: boolean;
      paymentDetail: boolean;
      questions: string; 
      formDeadline:Date
    }>
  ): Promise<void> => {
    await connectToDatabase();
  
    try {
      const updatedArbiter = await Arbriter.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (updatedArbiter) {
        console.log(`Arbiter with ID ${id} updated successfully`);
      } else {
        console.error(`Arbiter with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Error updating arbiter:', error);
    }
  };
  
  
  export const saveParticipantData = async (newParticipantData: {
    name: string;
    email: string;
    teamName: string| undefined;
    questions: string| undefined;
    walletAddress: string| undefined;
    paymentDetails: string| undefined;
    entryFeeDetails: string| undefined;
    phoneNumber: string| undefined;
    tournamentId: string
  }): Promise<void> => {
    await connectToDatabase();
    
    const {
      name,
      email,
      teamName,
      questions,
      walletAddress,
      paymentDetails,
      entryFeeDetails,
      phoneNumber,
      tournamentId,
    } = newParticipantData;
  
    const newParticipant = new ParticipantData({
      name,
      email,
      teamName,
      questions,
      walletAddress,
      paymentDetails,
      entryFeeDetails,
      phoneNumber,
      tournamentId,
    });
  
    try {
      await newParticipant.save();
    } catch (error) {
      console.error('Error saving participant:', error);
    }
  };

  export const updateParticipantData = async (
    participantId: string,
    updatedParticipantData: Partial<{
      name: string;
      email: string;
      teamName?: string;
      questions?: string;
      walletAddress?: string;
      paymentDetails?: string;
      entryFeeDetails?: string;
      phoneNumber?: string;
      tournamentId: string;
    }>
  ): Promise<void> => {
    await connectToDatabase();
  
    try {
      const updatedParticipant = await ParticipantData.findByIdAndUpdate(
        participantId,
        updatedParticipantData,
        { new: true } // Returns the updated document
      );
  
      if (updatedParticipant) {
        console.log(`Participant with ID ${participantId} updated successfully`);
      } else {
        console.error(`Participant with ID ${participantId} not found`);
      }
    } catch (error) {
      console.error('Error updating participant:', error);
    }
  };  

  export const deleteParticipantData = async (participantId: string): Promise<void> => {
    await connectToDatabase();
  
    try {
      const deletedParticipant = await ParticipantData.findByIdAndDelete(participantId);
  
      if (deletedParticipant) {
        console.log(`Participant with ID ${participantId} deleted successfully`);
      } else {
        console.error(`Participant with ID ${participantId} not found`);
      }
    } catch (error) {
      console.error('Error deleting participant:', error);
    }
  };
  

  export const saveArbriterData = async (newArbriterData: {
    name: String;
    email: String;
    questions: String;
    walletAddress: String;
    paymentDetails: String;
    phoneNumber: String;
    tournamentId: String
  }): Promise<void> => {
    await connectToDatabase();
    
    const {
      name,
      email,
      questions,
      walletAddress,
      paymentDetails,
      phoneNumber,
      tournamentId,
    } = newArbriterData;
  
    const newArbriter = new ArbriterData({
      name,
      email,
      questions,
      walletAddress,
      paymentDetails,
      phoneNumber,
      tournamentId,
    });
  
    try {
      await newArbriter.save();
    } catch (error) {
      console.error('Error saving participant:', error);
    }
  };

  export const updateArbriterData = async (
    arbriterId: string,
    updatedArbriterData: Partial<{
      name: string;
      email: string;
      questions?: string;
      walletAddress?: string;
      paymentDetails?: string;
      phoneNumber?: string;
      tournamentId: string;
    }>
  ): Promise<void> => {
    await connectToDatabase();
  
    try {
      const updatedArbriter = await ArbriterData.findByIdAndUpdate(
        arbriterId,
        updatedArbriterData,
        { new: true } // Returns the updated document
      );
  
      if (updatedArbriter) {
        console.log(`Arbiter with ID ${arbriterId} updated successfully`);
      } else {
        console.error(`Arbiter with ID ${arbriterId} not found`);
      }
    } catch (error) {
      console.error('Error updating arbiter:', error);
    }
  };  

  export const deleteArbriterData = async (arbriterId: string): Promise<void> => {
    await connectToDatabase();
  
    try {
      const deletedArbriter = await ArbriterData.findByIdAndDelete(arbriterId);
  
      if (deletedArbriter) {
        console.log(`Arbiter with ID ${arbriterId} deleted successfully`);
      } else {
        console.error(`Arbiter with ID ${arbriterId} not found`);
      }
    } catch (error) {
      console.error('Error deleting arbiter:', error);
    }
  };
  

  export const saveWaitlistEntry = async (name: string, email: string): Promise<void> => {
    await connectToDatabase();
  
    const newWaitlistEntry = new waitlistModel({
      name,
      email,
    });
  
    try {
      await newWaitlistEntry.save();
      console.log('Waitlist entry saved successfully');
    } catch (error) {
      console.error('Error saving waitlist entry:', error);
    }
  };

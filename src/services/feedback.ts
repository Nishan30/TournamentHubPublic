import Feedback,{IFeedback} from "@/models/participantFeedbackModel";

/**
 * Helper class for interacting with the Feedback model.
 */
class FeedbackHelper {
  /**
   * Create a new feedback entry.
   * @param data - The feedback data to create.
   * @returns The created feedback document.
   */
  static async createFeedback(data: Partial<IFeedback>): Promise<IFeedback> {
    const feedback = new Feedback(data);
    return feedback.save();
  }

  /**
   * Get all feedback entries.
   * @returns An array of feedback documents.
   */
  static async getAllFeedback(): Promise<IFeedback[]> {
    return Feedback.find({});
  }

  /**
   * Get a single feedback entry by ID.
   * @param id - The ID of the feedback to fetch.
   * @returns The feedback document, or null if not found.
   */
  static async getFeedbackById(id: string): Promise<IFeedback | null> {
    return Feedback.findById(id);
  }

  /**
   * Update a feedback entry by ID.
   * @param id - The ID of the feedback to update.
   * @param data - The updated feedback data.
   * @returns The updated feedback document, or null if not found.
   */
  static async updateFeedbackById(id: string, data: Partial<IFeedback>): Promise<IFeedback | null> {
    return Feedback.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  /**
   * Delete a feedback entry by ID.
   * @param id - The ID of the feedback to delete.
   * @returns The deleted feedback document, or null if not found.
   */
  static async deleteFeedbackById(id: string): Promise<IFeedback | null> {
    return Feedback.findByIdAndDelete(id);
  }
}

export default FeedbackHelper;

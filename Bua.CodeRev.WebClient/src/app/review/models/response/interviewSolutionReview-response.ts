import { TaskReview } from '../taskReview';
import { TaskReviewResponse } from './taskReview-response';

export class InterviewSolutionReviewResponse {
    public interviewSolutionId?: string;
    public userId?: string;
    public interviewId?: string;
    public fullName?: string;
    public vacancy?: string;
    public startTimeMs?: number;
    public endTimeMs?: number;
    public timeToCheckMs?: number;
    public reviewerComment?: string;
    public averageGrade?: number;
    public interviewResult?: number;
    public taskSolutionsInfos?: TaskReviewResponse[];
};
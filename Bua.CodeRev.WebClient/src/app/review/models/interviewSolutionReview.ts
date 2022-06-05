import { InterviewSolutionReviewResponse } from './response/interviewSolutionReview-response';
import { TaskReview } from './taskReview';

export class InterviewSolutionReview {
    public interviewSolutionId: string;
    public userId: string;
    public interviewId: string;
    public fullName: string;
    public vacancy: string;
    public startTimeMs: number;
    public endTimeMs: number;
    public timeToCheckMs: number;
    public reviewerComment: string;
    public averageGrade: number;
    public interviewResult: number;
    public taskSolutionsInfos: TaskReview[];

    constructor(resp: InterviewSolutionReviewResponse) {
        this.interviewSolutionId = resp.interviewSolutionId ?? '';
        this.userId = resp.userId ?? '';
        this.interviewId = resp.interviewId ?? '';
        this.fullName = resp.fullName ?? '???';
        this.vacancy = resp.vacancy ?? 'Без вакансии';
        this.startTimeMs = resp.startTimeMs ?? -1;
        this.endTimeMs = resp.endTimeMs ?? -1;
        this.timeToCheckMs = resp.timeToCheckMs ?? -1;
        this.reviewerComment = resp.reviewerComment ?? '';
        this.averageGrade = resp.averageGrade ?? -1;
        this.interviewResult = resp.interviewResult ?? -1;
        this.taskSolutionsInfos = resp.taskSolutionsInfos?.map(task => new TaskReview(task)) ?? [];
    }
}
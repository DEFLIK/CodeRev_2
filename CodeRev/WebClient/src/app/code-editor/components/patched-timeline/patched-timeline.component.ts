import { Component, ComponentFactoryResolver, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxVideoTimelineComponent, VideoCellType } from 'ngx-video-timeline';
import { interval, Subject, takeUntil } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { ActionColors, ActionLabels, IOperationMark, RecordInfo } from '../../models/codeRecord';
import { TimelinePatcherService } from '../../services/timeline-patcher-service/timeline-patcher.service';

@Component({
    selector: 'app-patched-timeline',
    templateUrl: './patched-timeline.component.html',
    styleUrls: ['./patched-timeline.component.less']
})
export class PatchedTimelineComponent implements OnDestroy, OnInit {
    @Output()
    public valueChanges: EventEmitter<number> = new EventEmitter<number>();
    @ViewChild('container', { read: ViewContainerRef })
    public container!: ViewContainerRef;
    public timeLineComp?: NgxVideoTimelineComponent;
    public currentOperationMark: IOperationMark = { startTime: 0, endTime: 0, action: ActionLabels.noAction, color: ActionColors.noAction };
    private _unsubscriber: Subject<void> = new Subject<void>();
    private _videoCells?: VideoCellType[];

    constructor(
        private _patcher: TimelinePatcherService,
        private _componentFactory: ComponentFactoryResolver,

    ) { }
    public ngOnInit(): void {
        const observer = new ResizeObserver(() => {
            console.log('resize');
            
            if (!this.timeLineComp) {
                return;
            }

            this.timeLineComp.onResize();
        });
          

        var el = document.querySelector('.editor');
        if (el) {
            observer.observe(el);
        } else {
            throw new Error('Unable to find time line element');
        }
        
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
    }

    public buildComponent(): void {
        this.container.clear();
        const comp = this._componentFactory
            .resolveComponentFactory(
                NgxVideoTimelineComponent
            );
        const compRef = this.container.createComponent(comp);
        this._videoCells = [];
        this.timeLineComp = compRef.instance;
        this.timeLineComp.videoCells = this._videoCells;
        this.timeLineComp.playBarColor = '#ff6464';

        // this.subscribeToValueChange(this.timeLineComp.keyUp);
        this.subscribeToValueChange(this.timeLineComp.mouseDown);
        
        setTimeout(() => {
            if (!this.timeLineComp) {
                throw new Error('Timeline component got removed before patching ended');
            }

            this._patcher.patchTimelineComponent(this.timeLineComp);

            this.timeLineComp.zoom = 0.5;
            this.refreshZoom(this.timeLineComp);
        });
    }

    public setCurrentTime(time: number): void {
        if (!this.timeLineComp) {    
            console.log('Time line comp is not initialized');
               
            return;
        }

        this.timeLineComp.isPlayClick = true;
        this.timeLineComp.playTime = time;
        this.timeLineComp.set_time_to_middle(this.timeLineComp.playTime);
    }

    public setProperties(startTime: number, duration: number, records: RecordInfo[]): void {
        setTimeout(() => {
            if (!this.timeLineComp || !this._videoCells) {
                throw new Error('Component not builded yet');
            }

            this.timeLineComp.startTimeThreshold = startTime;
            this.timeLineComp.endTimeThreshold = startTime + duration;
            this.timeLineComp.playTime = startTime;
            
            this.updateMarks(this._videoCells, records, startTime, duration);

            this.timeLineComp.onResize();
        });
    }

    public updateOperationLabel(playingRecord: RecordInfo): void {
        this.currentOperationMark = this.getCurrentOperationMark(playingRecord);
    }

    public mfWheel(e: Event): void {
        this.timeLineComp?.mousewheelFunc(e);
    }

    private getCurrentOperationMark(playingRecord: RecordInfo): IOperationMark {
        if (!this.timeLineComp) {       
            throw new Error('Time line components is not initialized');
        }

        const currentTime = this.timeLineComp.playTime as number - playingRecord.recordStartTime;

        for (const cell of playingRecord.points ?? []) {
            if (cell.startTime <= currentTime && currentTime <= cell.endTime) {
                return cell;
            }
        }

        return this.timeLineComp.playTime <= playingRecord.recordStartTime || playingRecord.recordStartTime + playingRecord.duration <= this.timeLineComp.playTime
            ? { startTime: 0, endTime: 0, action: ActionLabels.noAction, color: ActionColors.noAction }
            : { startTime: 0, endTime: 0, action: ActionLabels.solving, color: ActionColors.solving };
    }

    private subscribeToValueChange(event: EventEmitter<number>): void {
        event
            .pipe(
                takeUntil(this._unsubscriber)
            )
            .subscribe((value: any) => {
                this.valueChanges.emit(value);
            });
    }

    private updateMarks(sourceContainer: VideoCellType[], records: RecordInfo[], startTime: number, duration: number): void {
        sourceContainer.splice(0, sourceContainer.length);
        let prevRecord: RecordInfo | undefined = undefined;

        for (const record of records) {
            
            for (const point of record.points) {
                const endTime = record.recordStartTime + point.endTime + (point.startTime === point.endTime ? 1000 : 0);
                sourceContainer.push({
                    beginTime: record.recordStartTime + point.startTime,
                    endTime: (endTime < record.recordStartTime + record.duration) ? endTime : (record.recordStartTime + record.duration),
                    style: {
                        background: point.color
                    }
                });
            }

            if (prevRecord) {
                sourceContainer.push({
                    beginTime: prevRecord.recordStartTime + prevRecord.duration + 1,
                    endTime: record.recordStartTime - 1,
                    style: {
                        background: '#87878785'
                    }
                });
            }

            sourceContainer.push({
                beginTime: record.recordStartTime,
                endTime: record.recordStartTime + record.duration,
                style: {
                    background: '#90cbff59'
                }
            });

            prevRecord = record;
        }
    }

    private refreshZoom(timeLineComp: NgxVideoTimelineComponent): void {
        timeLineComp.mousewheelFunc(new WheelEvent('in', {
            deltaX: 1
        }));
    }
}

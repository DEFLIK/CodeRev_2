import { Component, ComponentFactoryResolver, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { NgxVideoTimelineComponent, VideoCellType } from 'ngx-video-timeline';
import { interval, Subject, takeUntil } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { RecordInfo } from '../../models/codeRecord';
import { TimelinePatcherService } from '../../services/timeline-patcher-service/timeline-patcher.service';

@Component({
    selector: 'app-patched-timeline',
    templateUrl: './patched-timeline.component.html',
    styleUrls: ['./patched-timeline.component.less']
})
export class PatchedTimelineComponent implements OnDestroy {
    @Output()
    public valueChanges: EventEmitter<number> = new EventEmitter<number>();
    @ViewChild('container', { read: ViewContainerRef })
    public container!: ViewContainerRef;
    public timeLineComp?: NgxVideoTimelineComponent;
    private _unsubscriber: Subject<void> = new Subject<void>();
    private _videoCells?: VideoCellType[];

    constructor(
        private _patcher: TimelinePatcherService,
        private _componentFactory: ComponentFactoryResolver,

    ) { }
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

        this.timeLineComp
            .keyUp
            .pipe(
                takeUntil(this._unsubscriber)
            )
            .subscribe((value: any) => {
                this.valueChanges.emit(value);
            });
        this.timeLineComp
            .mouseDown
            .pipe(
                takeUntil(this._unsubscriber)
            )
            .subscribe((value: any) => {
                this.valueChanges.emit(value);
            });
        
        setTimeout(() => {
            if (!this.timeLineComp) {
                throw new Error('Timeline component got removed before patching ended');
            }

            this._patcher.patchTimelineComponent(this.timeLineComp);
        });
    }

    public setCurrentTime(time: number): void {
        if (!this.timeLineComp) {
            return;
        }

        this.timeLineComp.currentTimestamp = this.timeLineComp.startTimestamp += time;
        this.timeLineComp.set_time_to_middle(this.timeLineComp.currentTimestamp);
    }

    public setProperties(startTime: number, duration: number, records: RecordInfo): void {
        setTimeout(() => {
            if (!this.timeLineComp || ! this._videoCells) {
                throw new Error('Component not builded yet');
            }
            // const duration = this._record.getDuration();
            this.timeLineComp.startTimeThreshold = startTime;
            this.timeLineComp.endTimeThreshold = startTime + duration;
            this.timeLineComp.playTime = startTime;
            this.timeLineComp.zoom = 0.1;
            
    
            // const res: VideoCellType[] = [];
            this._videoCells.splice(0, this._videoCells.length);
            for (const point of records.points) {
                this._videoCells.push({
                    beginTime: startTime + point.startTime,
                    endTime: startTime + point.endTime + 10000,
                    // beginTime: this.startTimeThreshold + 10,
                    // endTime: this.startTimeThreshold + 100000,
                    style: {
                        background: point.color
                    }
                });
            }
            
            this._videoCells.push({
                beginTime: startTime,
                endTime: startTime + duration,
                style: {
                    background: '#90cbff59'
                }
            });
    
            this.timeLineComp.mousewheelFunc(new WheelEvent('in', {
                deltaX: 1
            }));
        });

    }

    public mfWheel(e: Event): void {
        this.timeLineComp?.mousewheelFunc(e);
    }
}

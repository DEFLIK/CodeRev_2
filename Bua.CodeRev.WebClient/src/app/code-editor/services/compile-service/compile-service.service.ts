import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from 'src/app/global-services/request/http.service';
import { RequestMethodType } from 'src/app/global-services/request/models/request-method';
import { EntryPoint } from '../../models/entryPoint';
import { ExecutionRequest } from '../../models/executionRequest';
import { ExecutionResult } from '../../models/executionResult';
import { ExecutionResultResponse } from '../../models/response/executionResult-response';

@Injectable({
    providedIn: 'root'
})
export class CompileService {
    public get onOutputRefresh$(): Observable<ExecutionResult> {
        return this._onOutputRefresh$.asObservable();
    }

    private _onOutputRefresh$ = new Subject<ExecutionResult>();

    constructor(private _req: HttpService) { }

    public execute(code: string, entry: EntryPoint): void {
        this._req.request<ExecutionResult, ExecutionRequest>({
            url: `https://localhost:44343/api/compile/execute`,
            method: RequestMethodType.put,
            body: new ExecutionRequest(code, entry)
        }).subscribe(resp => {
            if (resp.ok) {
                this._onOutputRefresh$.next(resp.body ?? new ExecutionResult(new ExecutionResultResponse()));
            } else {
                //todo
            }
        });
    }
}

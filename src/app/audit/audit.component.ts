import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { Audit } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit
{
    currentUser: User;
    audits = [];
    pageOfItemslist: Array<any>;
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    ){
        this.currentUser = this.authenticationService.currentUserValue;
    }
    

    ngOnInit()
    {
        this.loadAllAudits();
    }
    onChangePage(pageOfItemslist: Array<any>) {
        // update current page of items
        this.pageOfItemslist = pageOfItemslist;
    }

    private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(audits => this.audits = audits);
    }
}
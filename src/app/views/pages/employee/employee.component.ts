import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeModel} from '../../../core/employee/_models/employee.model';
import {EmployeeService} from '../../../core/employee/_services/employee.service';
import {TableService} from '../../../core/general/_services/table.service';
import {TaskModel} from '../../../core/task/_models/task.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['../../../app.component.scss', './employee.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeComponent implements OnInit {
  @ViewChild('employeeTable') elRef;
  @ViewChild('employeeModal') public employeeModal: TemplateRef<any>;
  newEmployee: EmployeeModel;
  employees: EmployeeModel[] = [];
  selectedEmployee: EmployeeModel;
  totalElements = 0;
  pageSize = 10;
  page = 1;

  constructor(private employeeService: EmployeeService,
              private toastr: ToastrService,
              private modalService: NgbModal,
              private tableService: TableService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.newEmployee = new EmployeeModel();
    this.getAllEmployees();
  }

  save(newEmployee: EmployeeModel) {
    this.employeeService.saveEmployee(newEmployee)
      .subscribe((employeeModel: EmployeeModel) => {
        this.modalService.dismissAll();
        this.toastr.success('Employee saved successfully');
        this.getAllEmployees();
      });
  }

  edit(employee: EmployeeModel) {
    this.newEmployee = employee;
    this.open(this.employeeModal);
  }

  loadEmployee(page: number) {
    this.page = page;
    this.getAllEmployees();
  }

  private getAllEmployees() {
    this.employeeService.getEmployees(this.page - 1, this.pageSize).subscribe((employees: EmployeeModel[]) => {
      this.employees = employees['content'];
      this.totalElements = employees['totalElements'];
      this.cdr.detectChanges();
      this.tableService.addLabelTag(this.elRef);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  addNew() {
    this.newEmployee = new EmployeeModel();
    this.open(this.employeeModal);
  }

  openDeletePopup(deleteModal: TemplateRef<any>, employee: EmployeeModel) {
    this.selectedEmployee = employee;
    this.modalService.open(deleteModal, {ariaLabelledBy: 'modal-basic-title', scrollable: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.selectedEmployee).subscribe(() => {
      this.toastr.success('Employee deleted successfully');
      this.modalService.dismissAll();
      this.getAllEmployees();
    });
  }

  cancel() {
    this.modalService.dismissAll();
  }
}

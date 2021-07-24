import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GeneicService } from 'src/app/services/geneic.service';
/**
 * @title Data table with sorting, pagination.
 */
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  public selection = new SelectionModel<PeriodicElement>(true, []);
  public displayedColumns: string[] = ['select', 'id', 'first_name', 'last_name', 'email', 'upload', 'avatar'];
  public dataSource: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedFiles: FileList;

  constructor(private _genericService: GeneicService) {
  }

  ngOnInit(): void {
    this.getUserDetail();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows: any = this.dataSource.filteredData;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  /** Getting selected row data */
  selectionRow(row) {
    console.log('selected row=======', row)
  }
  /**Select File */
  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
  /** Download file */
  downloadMyFile(file) {
    console.log(file)
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', file);
    link.setAttribute('download', `image.png`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  /*Get User List **/
  getUserDetail() {
    this._genericService.getUserList().subscribe(data => {
      var responseData: any = data;
      this.dataSource = new MatTableDataSource(responseData.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.error(err);
    });
  }

}
/**Data Interface */
export interface PeriodicElement {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}
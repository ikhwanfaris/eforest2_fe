import { AuthService } from './../../services/auth.service';
import { Component, Injector, ViewChild, AfterViewInit } from '@angular/core';
import { TeamDetailModel, UserDetailModel } from 'src/app/models/user.model';
import { BasePage } from 'src/app/base-page/base-page';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileService } from 'src/app/services/profile.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-my-direct-bonus',
  templateUrl: './my-direct-bonus.component.html',
  styleUrls: ['./my-direct-bonus.component.scss'],
})
export class MyDirectBonusComponent extends BasePage implements AfterViewInit {
  submitted = false;
  totalEntry: any;
  page = 1;
  entry = 20;
  temptotalPages: number;
  totalPages: number;
  beforeLastPages: number;
  beforeLastEnrty: number;
  displayPages = [];
  is_loading = true;
  userDetails: UserDetailModel;
  teamDetails: TeamDetailModel;
  downlineOne;
  downlineTwo;
  directDetails;
  teamInfo;
  mobile = false;
  totalDownlineTwo: number;
  showDataOne: boolean = false;
  showDataTwo: boolean = false;
  showData: boolean = false;
  displayedColumns: string[] = [
    'username',
    'email',
    'community_status',
    'invited_by',
    'total_purchased_packages',
  ];

  dataSource = new MatTableDataSource();
  dataSourceTwo = new MatTableDataSource();

  constructor(
    private authService: AuthService,
    injector: Injector,
    private profileService: ProfileService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    super(injector);
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async ngOnInit() {
    // console.log(this.dataSource)
    await this.showLoadingView();
    await this.authService.userDetails();
    this.directDetails = await this.authService.getMyDirect(this.page);
    console.log(this.directDetails);
    this.userDetails = JSON.parse(this.authService.getUserDetails());
    // console.log(this.userDetails);

    if (this.directDetails.users.length > 0)  {
      this.showData = true;
      this.showDataOne = true;
      // console.log("no data");
    } else if (this.directDetails.users.length == 0 || undefined) {
      // console.log("got data");
      this.showDataOne = false;
      this.showData = false;
      //  console.log(this.downlineOne.data.level_1);
      //  console.log(this.downlineOne.data.level_1[0]["user_id"]);
      this.dataSource = new MatTableDataSource<Element>(
        this.directDetails.community
      );
    }
    this.totalEntry = this.directDetails.total_item_count;
    if (this.directDetails.total_item_count < 20) {
      this.entry = this.directDetails.total_item_count;
    } else {
      this.entry = 20;
    }
    this.temptotalPages = this.directDetails.total_item_count / 20;
    console.log(this.temptotalPages);
    if (Number.isInteger(this.temptotalPages) == false) {
      this.temptotalPages += 1;
    }
    this.totalPages = parseInt(this.temptotalPages.toFixed(1));
    console.log(this.totalPages);
    this.beforeLastPages = this.totalPages - 1;
    this.displayPages = [];
    for (var i = 0; this.totalPages > i; i++) {
      this.displayPages.push(i + 1);
    }
    this.is_loading = false;
    this.dismissLoadingView();
    if (window.innerWidth <= 1150) {
      // 768px portrait
      this.mobile = true;
    }
  }

  async adjustTableView(page: number) {
    await this.showLoadingView();
    this.is_loading = true;
    this.directDetails = await this.authService.getMyDirect(this.page);
    this.is_loading = false;
    // console.log(this.bonusList.data.items.length)
    this.dismissLoadingView();
  }

  lessPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.entry -= 20;
      this.adjustTableView(this.page);
    }
    if (this.page == this.beforeLastPages) {
      this.entry = this.beforeLastEnrty;
    }
  }

  addPage() {
    if (this.page < this.totalPages) {
      if (this.page == this.beforeLastPages) {
        this.beforeLastEnrty = this.entry;
      }
      this.page += 1;
      if (this.page == this.totalPages) {
        this.entry = this.totalEntry;
      } else {
        this.entry += 20;
      }
      this.adjustTableView(this.page);
    }
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById('myteamTable');
    switching = true;
    // Set the sorting direction to ascending:
    dir = 'asc';
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        let xValue = x.innerHTML.toLowerCase();
        let yValue = y.innerHTML.toLowerCase();

        switch (n) {
          // case 0:
          //   xValue = Number(x.innerHTML);
          //   yValue = Number(y.innerHTML);
          //   break;
          case 0:
          case 1:
          case 2:
          case 3:
            xValue = x.innerHTML;
            yValue = y.innerHTML;
            break;
          case 4:
          case 5:
          case 6:
            xValue = parseFloat(x.innerHTML.replace(/,/g, ''));
            yValue = parseFloat(y.innerHTML.replace(/,/g, ''));
            break;
        }

        let clickedTH = document.getElementById('arrows_myteam_' + n);

        if (dir == 'asc') {
          clickedTH.setAttribute('name', 'caret-down-outline');
          if (xValue > yValue) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == 'desc') {
          clickedTH.setAttribute('name', 'caret-up-outline');
          if (xValue < yValue) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      let otherTH = document.querySelectorAll('[id^=arrows_myteam_]');
      let clickedTH = document.getElementById('arrows_myteam_' + n);

      Array.from(otherTH).forEach((th) => {
        // console.log(th);
        if (th !== clickedTH) {
          th.setAttribute('hidden', 'true');
        } else {
          th.removeAttribute('hidden');
        }
      });

      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
export interface Element {
  username: string;
  user_id: number;
}

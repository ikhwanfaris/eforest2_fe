import { OrderModel } from './../../models/packages.model';
import { PackageService } from './../../services/packages.service';
import { Component, OnInit, Injector } from '@angular/core';
import { OrderDataModel } from 'src/app/models/packages.model';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-my-package',
  templateUrl: './my-package.component.html',
  styleUrls: ['./my-package.component.scss'],
})
export class MyPackageComponent extends BasePage implements OnInit {
  constructor(private packageServ: PackageService, injector: Injector) {
    super(injector);
  }
  orderList: OrderDataModel[];
  totalLoveTrees = 0;
  totalEarthTrees = 0;
  showURLModal = false;
  urlList = [];
  async ngOnInit() {
    const result = await this.packageServ.getOrdersList();
    // console.log(result);
    this.totalLoveTrees = result.total_love_tree;
    this.totalEarthTrees = result.total_earth_tree;
    if (result.success) {
      result.data.sort(function (a, b) {
        return b.ordered_at_timestamp - a.ordered_at_timestamp;
      });
      this.orderList = result.data;
    }
  }

  async triggerModal(package_ref) {
    this.showURLModal = true;
    try {
      const treesUrl: any = await this.packageServ.getTreesURL(package_ref);
      if (treesUrl.success) {
        this.urlList = treesUrl.data;
      }
    } catch (e) {
      this.showToast(e.error.message, 3000, 'top', 'error');
      console.error(e);
    }
  }

  dismissModal() {
    this.showURLModal = false;
    this.urlList = [];
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
    table = document.getElementById('packageTable');
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
          case 0:
            xValue = xValue.split('t')[1];
            yValue = yValue.split('t')[1];

            if (xValue.includes('k')) {
              xValue = xValue.split('k')[0] + '000';
            }
            if (yValue.includes('k')) {
              yValue = yValue.split('k')[0] + '000';
            }
            xValue = Number(xValue);
            yValue = Number(yValue);
            break;
          case 1:
          case 2:
            xValue = Number(x.innerHTML);
            yValue = Number(y.innerHTML);
            break;
          case 3:
            xValue = new Date(x.innerHTML);
            yValue = new Date(y.innerHTML);
            break;
          case 4:
          case 5:
          case 6:
            parseFloat(x.innerHTML.replace(/,/g, ''));
            xValue = parseFloat(x.innerHTML.replace(/,/g, ''));
            yValue = parseFloat(y.innerHTML.replace(/,/g, ''));
            break;
        }

        let clickedTH = document.getElementById('arrows_' + n);

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
      let otherTH = document.querySelectorAll('[id^=arrows_]');
      let clickedTH = document.getElementById('arrows_' + n);

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
}

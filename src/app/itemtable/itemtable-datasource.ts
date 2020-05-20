import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {DataTable} from './data';

// TODO: Replace this with your own data model type
export interface ItemtableItem{
  id: number;
  status: string;
  item: string;
  number: number;
  location: string;
  containerID: string;
  weight: number;
  dg: string;
  arrival: string;
  sender: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ItemtableItem[] = DataTable;


/**
 * Data source for the Itemtable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ItemtableDataSource extends DataSource<ItemtableItem> {
  data: ItemtableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ItemtableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ItemtableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ItemtableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'status': return compare(a.status, b.status, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'item': return compare(+a.item, +b.item, isAsc);
        case 'number': return compare(+a.number, +b.number, isAsc);
        case 'location': return compare(+a.location, +b.location, isAsc);
        case 'containerID': return compare(+a.containerID, +b.containerID, isAsc);
        case 'weight': return compare(+a.weight, +b.weight, isAsc);
        case 'dg': return compare(+a.dg, +b.dg, isAsc);
        case 'arrival': return compare(+a.arrival, +b.arrival, isAsc);
        case 'sender': return compare(+a.sender, +b.sender, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

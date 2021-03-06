import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Manifest } from '../mock-container';

// // TODO: Replace this with your own data model type
export interface ContainerElement {
  name: string;
  itemId: number;
  amount: string;
  weight: string;
  recipient: string;
}
export interface ContainertableItem {
  status: string;
  id: number;
  containerID: string;
  content: ContainerElement[];
  location: string;
  type: string;
  weight: string;
  size: string;
  DG: string;
  arrival: string;
  sender: string;
}
// // TODO: replace this with real data from your application
const EXAMPLE_DATA: ContainertableItem[] = Manifest;

/**
 * Data source for the Containertable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ContainertableDataSource extends DataSource<ContainertableItem> {
  data: ContainertableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;
  filter: string;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ContainertableItem[]> {
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
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ContainertableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ContainertableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'status': return compare(a.status, b.status, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'containerID': return compare(a.containerID, b.containerID, isAsc);
        case 'content': return compare(+a.content, +b.content, isAsc);
        case 'location': return compare(a.location, b.location, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'weight': return compare(a.weight, b.weight, isAsc);
        case 'DG': return compare(a.DG, b.DG, isAsc);
        case 'arrival': return compare(a.arrival, b.arrival, isAsc);
        case 'sender': return compare(a.sender, b.sender, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

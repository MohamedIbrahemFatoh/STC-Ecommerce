import {Notification} from './Notification';

export class NotificationsSearchModel {
  pageData: Notification[];
  page_number = 1;
  per_page = 10;
  count_items: number;
}

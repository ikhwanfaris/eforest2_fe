import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './home-announcement.component.html',
  styleUrls: ['./home-announcement.component.scss'],
})
export class HomeAnnouncementComponent implements OnInit {
  @Input() modalUrl;
  @Input() modalTitle;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
    this.modalUrl = '';
  }
}

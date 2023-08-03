import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  @Input() modalUrl;
  @Input() modalTitle;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
    this.modalUrl = '';
  }
}

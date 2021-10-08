import { Component, OnInit } from '@angular/core';
import { LogoService } from 'src/app/services/logo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  $logo: Observable<string>;
  constructor(private logoService: LogoService) {}

  ngOnInit() {
    this.$logo = this.logoService.getLogo();
  }
}

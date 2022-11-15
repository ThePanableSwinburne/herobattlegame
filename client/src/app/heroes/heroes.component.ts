import { Component, OnInit } from '@angular/core';
import { Hero as hero } from '../models/hero';
import {HttpClient} from '@angular/common/http'
import { enemy } from '../models/enemy';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero?: hero;
  selectedEnemy?: enemy;

  heroes: hero[] = [];
  enemies: enemy[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getHeroes().subscribe(x => {this.heroes = x as hero[]})
    this.getEnemies().subscribe(x => {this.enemies = x as enemy[]})
  }

  roll(max: number) : number
  {
    return Math.floor(Math.random() * max);
  }

  getHeroes()
  {
    return this.http.get<hero[]>('http://localhost:2190/api/heros');
  }

  getEnemies()
  {
    return this.http.get<enemy[]>('http://localhost:2190/api/enemies');
  }

  getGameHistory()
  {

  }

  onSelect(hero: hero): void {
    this.selectedHero = hero;
    hero.rollAmount--;
  }

  onSelectEnemy(enemy: enemy): void {
    this.selectedEnemy = enemy;
  }

}

import { Component, OnInit } from '@angular/core';
import { Hero as hero } from '../models/hero';
import {HttpClient} from '@angular/common/http'
import { enemy } from '../models/enemy';
import { gameHistory } from '../models/gameHistory';
import { timeInterval } from 'rxjs';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  rollText?: string;
  selectedHero?: hero;
  selectedEnemy?: enemy;

  heroes: hero[] = [];
  enemies: enemy[] = [];
  records: gameHistory[] = [];

  constructor(private http: HttpClient) { }

  checkIfNoRolls()
  {
    for (let i = 0; i < this.heroes.length; i++) {
      const element = this.heroes[i];
      if (element.rollAmount > 0)
        return false;
    }
    return true;
  }

  checkIfNoEnemies()
  {
    for (let i = 0; i < this.enemies.length; i++) {
      const element = this.enemies[i];
      if (element.health > 0)
        return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.getHeroes().subscribe(x => {this.heroes = x as hero[]})
    this.getEnemies().subscribe(x => {this.enemies = x as enemy[]})
    this.getGameHistory().subscribe(x => {this.records = x as gameHistory[]})
  }

  rollButton()
  {
    console.log(this.records.length);
    let heroRoll = this.roll(this.selectedHero.maximumRoll);
    if ((this.selectedEnemy.health - heroRoll) <= 0)
    {
      this.selectedEnemy.health = 0;
    }
    else
    {
      this.rollText = `${this.selectedHero.heroName} has rolled ${heroRoll} and attacked ${this.selectedEnemy.name}`
      this.selectedEnemy.health -= heroRoll;
    }

    this.selectedHero.rollAmount--;

    if (this.checkIfNoRolls())
      if (this.checkIfNoEnemies())
      {
        this.rollText = "You guys both lost? HAHAHAHAHH";
        this.updateRecord(this.records.length, "draw").subscribe(()=>{});
      }
      else
      { 
        this.updateRecord(this.records.length, "lost").subscribe(()=>{});
        this.rollText = "You lost. You are freaking bad at the video game my dude";
      }
    else
      if(this.checkIfNoEnemies())
      {
        this.updateRecord(this.records.length, "won").subscribe(()=>{});
        this.rollText = "you won. good job my man";
      }
    
    
    this.selectedEnemy = null;
    this.selectedHero = null;

  }

  roll(max: number) : number
  {
    return Math.floor(Math.random() * max) + 1;
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
    return this.http.get<gameHistory[]>('http://localhost:2190/api/gamehistories');
  }

  onSelect(hero: hero): void {
    if (this.selectedHero == hero)
    {
      this.selectedHero = null;
      return;
    }
    this.selectedHero = hero;
  }

  onSelectEnemy(enemy: enemy): void {
    if (this.selectedEnemy == enemy)
    {
      this.selectedEnemy = null;
      return;
    }
    this.selectedEnemy = enemy;
  }

  updateRecord(id: number, value: string)
  {
    console.log(this.records);
    let newRecord: gameHistory = {
      id: id,
      date: new Date(),
      winnerMessage: value
    };
    this.records.push(newRecord);
    return this.http.post('http://localhost:2190/api/gamehistories', newRecord);
  }

}

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

  rollText?: string;
  selectedHero?: hero;
  selectedEnemy?: enemy;

  heroes: hero[] = [];
  enemies: enemy[] = [];

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
  }

  rollButton()
  {
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
      }
      else
      this.rollText = "You lost. You are freaking bad at the video game my dude";
    else
      if(this.checkIfNoEnemies())
        this.rollText = "you won. good job my man";
    
    
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

}

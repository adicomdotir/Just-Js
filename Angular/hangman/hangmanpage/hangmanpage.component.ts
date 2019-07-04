import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-hangmanpage',
    templateUrl: './hangmanpage.component.html',
    styleUrls: ['./hangmanpage.component.css']
})
export class HangmanpageComponent implements OnInit {
    word: string = 'abcd';
    index = 0;
    guess = '----';
    mistake = '----';
    mistakeLen = 0;
    clicketBtnList = [];

    constructor() { }

    ngOnInit() {
    }

    btnClick(event) {
        let tempIndex = this.index;
        for (let i = 0; i < this.word.length; i++) {
            if (this.word.charAt(i) == event.target.innerText) {
                this.guess = this.guess.substr(0, i) + event.target.innerText + this.guess.substr(i + 1);
                this.index++;
            }
        }

        if (tempIndex == this.index) {
            this.mistake = this.mistake.substr(0, this.mistakeLen) + event.target.innerText  + this.mistake.substr(this.mistakeLen + 1);
            this.mistakeLen++;
        }

        document.getElementById(event.target.id).setAttribute('disabled', 'true');
        this.clicketBtnList.push(event.target.id);
        
        if (this.index >= this.word.length) {
            alert('You Win');
            this.resetGame();
        }
        
        if (this.mistakeLen > this.word.length) {
            alert('You Lose');
            this.resetGame();
        }
    }

    resetGame() {
        this.word = 'abcd';
        this.index = 0;
        this.guess = '----';
        this.mistake = '----';
        this.mistakeLen = 0;        
        for (let i = 0; i < this.clicketBtnList.length; i++) {
            const id = this.clicketBtnList[i];
            document.getElementById(id).removeAttribute('disabled');
        }
        this.clicketBtnList = [];
    }

}

import { Component, OnInit } from '@angular/core';
import { helper } from 'src/app/configs/helper.config';

@Component({
    selector: 'app-hangmanpage',
    templateUrl: './hangmanpage.component.html',
    styleUrls: ['./hangmanpage.component.css']
})
export class HangmanpageComponent implements OnInit {
    word: string = '';
    mistake: string = '';
    guess: string = '';
    index: number = 0;
    mistakeLen: number = 0;
    clicketBtnList = [];

    constructor() {
        this.randomWordSelector();
    }

    ngOnInit() { }

    btnClick(event) {
        const elementId = event.target.id;
        const elementText = event.target.innerText;
        const tempIndex = this.index;

        for (let i = 0; i < this.word.length; i++) {
            if (this.word.charAt(i) == elementText) {
                this.guess = this.guess.substr(0, i) + elementText + this.guess.substr(i + 1);
                this.index++;
            }
        }

        // If work when letter isn't in word
        if (tempIndex == this.index) {
            this.mistake = this.mistake.substr(0, this.mistakeLen) + elementText + this.mistake.substr(this.mistakeLen + 1);
            this.mistakeLen++;
        }

        document.getElementById(elementId).setAttribute('disabled', 'true');
        document.getElementById(elementId).removeAttribute('class');
        document.getElementById(elementId).setAttribute('class', 'btn btn-danger');
        this.clicketBtnList.push(elementId);

        if (this.index >= this.word.length && this.word === this.guess) {
            alert('You Win' + '\n' + 'Your Answer: ' + this.word);
            this.resetGame();
        }

        if (this.mistakeLen > this.word.length) {
            alert('You Lose' + '\n' + 'Correct Answer: ' + this.word);
            this.resetGame();
        }
    }

    resetGame() {
        this.randomWordSelector();
        this.index = 0;
        this.mistakeLen = 0;
        for (let i = 0; i < this.clicketBtnList.length; i++) {
            const id = this.clicketBtnList[i];
            document.getElementById(id).removeAttribute('class');
            document.getElementById(id).setAttribute('class', 'btn btn-success');
            document.getElementById(id).removeAttribute('disabled');
        }
        this.clicketBtnList = [];
    }

    randomWordSelector() {
        let rand = Math.random() * helper['words'].length;
        rand = Math.floor(rand);
        this.word = helper['words'][rand];
        this.word = this.word.toLowerCase();
        this.guess = '';
        this.mistake = '';
        for (let i = 0; i < this.word.length; i++) {
            this.guess += '-';
            this.mistake += '-';
        }
    }
}

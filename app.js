
const app = new Vue({
    el: '#app',
    data: {
        isGameRunning: false,
        isGameEnded: false,
        playerPoints: 0,
        dealerPoints: 0,
        msgBoard: '',
        playerHand: [],
        dealerHand: [],
        deck: [],
        cardSwitch: []
    },
    beforeMount(){
        this.deck = this.generateCardPool();
        this.cardSwitch = new Array(52).fill(false);
    },
    methods:{
        startNewGame(){
            this.isGameRunning = true;
            
            for(let i = 0; i < 2; i++){
                this.playerHand.push(this.dealCard());
                this.dealerHand.push(this.dealCard());
            }
            this.playerPoints = this.checkHandValue(this.playerHand);
            this.dealerPoints = this.checkHandValue(this.dealerHand);
            this.msgBoard = 'Hit, Stand, or Quit...';
        },
        hit(){
            this.playerHand.push(this.dealCard());
            this.playerPoints = this.checkHandValue(this.playerHand);

            if(this.playerPoints > 21){
                this.playerPoints = 'Bust!';
                this.isGameEnded = true;
                this.msgBoard = 'BUST! You lose!';
                return;
            }
        },
        stand(){
            while(this.dealerPoints <= 16){
                this.dealerHand.push(this.dealCard());
                this.dealerPoints = this.checkHandValue(this.dealerHand); 
                if(this.dealerPoints > 21){
                    this.dealerPoints = 'BUST!';
                    this.isGameEnded = true;
                    this.msgBoard = 'Dealer Busted! You Win!';
                    return;
                }
            }
            if(this.dealerPoints > this.playerPoints){
                this.msgBoard = 'You Lost!';
            }else if(this.dealerPoints === this.playerPoints){
                this.msgBoard = 'Draw!';
            }else{
                this.msgBoard = 'You Win!';
            }
            this.isGameEnded = true;
        },
        quit(){
            this.isGameRunning = false;
            this.isGameEnded = false;
            this.msgBoard = '';
            this.playerPoints = 0;
            this.dealerPoints = 0;
            this.playerHand.length = 0;
            this.dealerHand.length = 0;
        },
        clearBoardNStartNewGame(){
            this.quit();
            this.startNewGame();
        },
        generateCardPool(){
            //d = Diamonds, s = Spades, c = Clubs, h = Hearts
            const colors = ['S', 'H', 'D', 'C'];
            const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
            const pool = [];
            values.map(v => {
                colors.map(c => {
                    pool.push(`${v}${c}`);
                });
            });
            return pool;
        },
        checkHandValue(hand){
            let value = 0;
            hand.map(e => {
                let v = e.slice(0, -1);
                if(Number.isNaN(parseInt(v)) && hand.length === 2 && v === 'A' && value < 11){
                    v = 11;
                } else if((Number.isNaN(parseInt(v)) && hand.length >= 3 && v === 'A') || (Number.isNaN(parseInt(v)) && hand.length === 2 && v === 'A' && value >= 11)){
                    v = 1;
                } else if(Number.isNaN(parseInt(v))){
                    v = 10;
                } else{
                    v = parseInt(v);
                }
                value += v;
            });
            return value;
        },
        dealCard(){
            let index;
            do {
                index = Math.floor(Math.random() * 52);
            } while (this.cardSwitch[index]);
            let card = this.deck[index];
            this.cardSwitch[index] = true;
            return card;
        },
        getSource(card){
            return `./png/${card}.png`;
        }
    }
});
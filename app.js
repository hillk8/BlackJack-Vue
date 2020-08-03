
const app = new Vue({
    el: '#app',
    data: {
        isGameRunnning: false,
        playerPoints: 0,
        dealerPoints: 0,
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
            this.isGameRunnning = true;
            for(let i = 0; i < 2; i++){
                this.playerHand.push(this.dealCard());
                this.dealerHand.push(this.dealCard());
            }
            this.playerPoints = this.checkHandValue(this.playerHand);
            this.dealerPoints = this.checkHandValue(this.dealerHand);
        },
        quit(){
            this.isGameRunnning = false;
            this.playerPoints = 0;
            this.dealerPoints = 0;
            this.playerHand = [];
            this.dealerHand = [];
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
        checkHandValue(){
            let value = 0;
            hand.map(e => {
                let v = e.slice(0, -1);
                if(Number.isNaN(parseInt(v)) && hand.length === 2 && v === 'A'){
                    v = 11;
                } else if(Number.isNaN(parseInt(v)) && hand.length >= 3 && v === 'A'){
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
            const card = this.deck[index];
            this.cardSwitch[index] = true;
            return card;
        }
    }
});
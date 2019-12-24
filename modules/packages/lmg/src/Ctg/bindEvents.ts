import { Suit } from "./Suit";

export default function (this: Suit) {
    this
        .on('locking', value => {
            //更新状态
            // console.log('print_locking', value);
            this.selectflag = value;
            if (this.selectflag) {
                this.startingBar.toggleVisibility();
                this.barTool.setBarWidth(0);
                this.selectend = 0;
                //this.endingBar.toggleVisibility();
                // console.log('print_lock', this.selectstart, this.data.index);
                this.selectrpstart = this.selectstart;
                this.selectrpend = this.data.index < this.selectrpstart + this.printlen ? this.data.index : this.selectrpstart + this.printlen
                this.drawobj.showselect();
                this.endingBar.setVisibility(false);
                this.emit('endTime', this.selectrpend);
            } else {
                this.startingBar.toggleVisibility();
                //this.endingBar.toggleVisibility();
                this.endingBar.setVisibility(false);
                // console.log(this.selectstart, this.data.index);
                this.drawobj.showselect(0, 0);
            }
        })
        .on('customizing', value => {
            // this.log('customizing', value, this.selectrpend, this.viewposition);
            if (value && this.selectflag) {
                this.selectend = 1;
                if (this.data.index < this.canvasline.width * 2) {
                    this.endingBar.setVisibility(true);
                    this.endingBar.setLeft(Math.floor(this.viewposition / 2));
                }
                else if (this.viewposition - this.selectrpend >= 0) {
                    this.endingBar.setVisibility(true);
                    this.endingBar.setLeft(this.canvasline.width - Math.floor((this.viewposition - this.selectrpend) / 2));
                }
            } else {
                this.selectend = 0;
                this.endingBar.setVisibility(false);
                this.drawobj.showselect()
            }
        })
        .on('setStartingTime', value => {
            // this.log('setStartingTime', value);

        })
        .on('setEndingTime', value => {
            // this.log('setEndingTime', value);

        })
        .on('showLine', () => {
            this.createLine()
        })
        .on('selectBackward', () => {
            if (!this.selectrpend) {
                this.selectrpend = this.data.index
            }
            this.selectflag = true
            this.selectrpend -= 200

            if ((this.viewposition - this.selectrpend) > this.width * 2 || this.viewposition < this.selectrpend) {
                this.viewposition = this.selectrpend + 200
            }
            // this.emit('locking', true)
            this.drawobj.drawdot(this.viewposition, false)
            this.drawobj.showselect()
            this.updateBarTool()

        })
        .on('selectForward', () => {
            if (!this.selectrpend) {
                this.selectrpend = this.data.index
            }
            this.selectflag = true
            this.selectrpstart += 200

            if ((this.selectrpstart - this.viewposition) > this.width * 2 || this.selectrpstart < this.viewposition) {
                this.viewposition = this.selectrpstart + this.width * 2 - 200
            }
            // this.emit('locking', true)
            this.drawobj.drawdot(this.viewposition, false)
            this.drawobj.showselect()
            this.updateBarTool()
        })
    this.log(this)
}
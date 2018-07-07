import { JsonController, Param, Get, Put, Post, Body, NotFoundError} from 'routing-controllers'
import Game from './entity'
import { Validator } from 'class-validator';

const validator = new Validator();


@JsonController()
export default class GameController {
    @Get('/games/:id')
    getGame(
      @Param('id') id: number
    ) {
      return Game.findOne(id)
    }

    @Get('/games')
    async allGames() {
    const games = await Game.find()
    return { games }
    }

    @Put('/games/:id')
    async updateGame(
      @Param('id') id: number,
      @Body() update: Partial<Game>
    ) {
      const game = await Game.findOne(id)
      if (!game) throw new NotFoundError('Cannot find game')
      const colors = ['red','blue','green', 'yellow', 'magenta']
      // if (update.color !== 'red' || 'blue'|| 'green'|| 'yellow'|| 'magenta') throw new NotFoundError('Incorrect color input')
      if ( validator.isNotIn(update.color, colors)) throw new NotFoundError('Incorrect color input')
      
      // const moves = (board1, board2) => 
      //     board1
      //   .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
      //   .reduce((a, b) => a.concat(b))
      //   .length
      // if (moves(game.board, update.board) !== 1 ) throw new NotFoundError('Too many moves')

    
      return Game.merge(game, update).save()
    }

    @Post('/games')
    async createGame(
      @Body() game: Game  
    ) {
      const {...rest} = game
      const colors = ['red', 'blue', 'green', 'yellow', 'magenta']
      const colorSelection= colors[Math.floor(Math.random() * colors.length)]
      rest.color = colorSelection
      const entity = Game.create(rest)
      return entity.save()
    }

        
}
import { JsonController, Param, Get, Put, Post, Body, NotFoundError} from 'routing-controllers'
import Game from './entity'

const colorSelection = ['red', 'blue', 'green', 'yellow', 'magenta']

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
    
      return Game.merge(game, update).save()
    }

    @Post('/games')
    async createGame(
      @Body() game: Game
      
    ) {
      const {...rest, board:} = game
      const entity = Game.create(rest)
      return entity.save()
    }

        
}
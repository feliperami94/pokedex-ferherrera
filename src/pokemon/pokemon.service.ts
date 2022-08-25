import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;
      
    } catch (error) {
        this.handleExceptions(error)
    }
    
    
  }

  async findAll() {
    return await this.pokemonModel.find();
  }

  async findOne(searchTerm: string) {

    let pokemon: Pokemon

    if(!isNaN(+searchTerm)){
      pokemon = await this.pokemonModel.findOne({no: searchTerm})
    }

    // MongoID
    if (!pokemon && isValidObjectId(searchTerm)){
      pokemon = await this.pokemonModel.findById(searchTerm);
    }

    //Name
    if (!pokemon){
      pokemon = await this.pokemonModel.findOne({name: searchTerm})
    }

    if(!pokemon) throw new NotFoundException(`Pokemon with id, name or no ${searchTerm} not found`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);
    let pokemonByName: Pokemon; //Validator
    let pokemonByNo: Pokemon; //Validator

    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(), ...updatePokemonDto}
    } catch (error) {
      this.handleExceptions(error)
    }
    
  }
  
  async remove(id: string) {
    //One way to do it
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // return {id};

    //Another way to do it
    // const result = await this.pokemonModel.findByIdAndDelete(id);

    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id})
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id ${id} not found`)
    
    return;



  }

  private handleExceptions( error: any) {
    
    if(error.code ===  11000){
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify( error.keyValue )}`)
    }
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
  }
}

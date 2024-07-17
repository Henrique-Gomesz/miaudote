import { Injectable, Logger } from "@nestjs/common";
import { add, isNil, noop } from "lodash";
import { UserRepository } from "../repositories/user-repository";
import { StateRepository } from "src/states/domain/repositories/states-repository";
import { UpdateAddress } from "../entities/address-update";

@Injectable()
export class UpdateUserAddressCommand{

    public onSuccess: () => void = noop;
    public onError: () => void = noop;

    public constructor(
        private readonly userRepository: UserRepository,
        private readonly stateRepository: StateRepository,
    ) {}

    public async execute(address: UpdateAddress, id: string): Promise<void>{
        try{
        const isAddressValid = await this.validateUserAddress(address);

        if(!isAddressValid) return this.onError();

        const addressReturn = await this.userRepository.updateAddressById(address, id);

        if(isNil(addressReturn)){
            return this.onError();
        }

        return this.onSuccess();
        }catch(e){
            console.log('Erro: ', e);
            Logger.log('[UpdateAddressCommand] - Error in updateAddressById, error: ', e);
            return this.onError();
        }
    }

    private async validateUserAddress(address?: UpdateAddress): Promise<boolean> {
    if (isNil(address)) {
      return false;
    }

    const userState = await this.stateRepository.getStateByName(address.state);

    if (isNil(userState)) {
      return false;
    }

    const userCity = userState.getCityByName(address.city);

    if (isNil(userCity)) {
      return false;
    }

    return true;
  }
}
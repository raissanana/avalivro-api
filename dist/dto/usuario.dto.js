"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioListDTO = exports.usuarioCreateDTO = void 0;
const class_validator_1 = require("class-validator");
class usuarioCreateDTO {
}
exports.usuarioCreateDTO = usuarioCreateDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Email deve ser uma string' }),
    __metadata("design:type", String)
], usuarioCreateDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Senha é obrigatória' }),
    (0, class_validator_1.IsString)({ message: 'Senha deve ser uma string' }),
    __metadata("design:type", String)
], usuarioCreateDTO.prototype, "senha", void 0);
class usuarioListDTO {
}
exports.usuarioListDTO = usuarioListDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'ID é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'ID deve ser uma string' }),
    __metadata("design:type", String)
], usuarioListDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Email deve ser uma string' }),
    __metadata("design:type", String)
], usuarioListDTO.prototype, "email", void 0);

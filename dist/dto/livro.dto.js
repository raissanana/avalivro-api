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
exports.LivroCreateDTO = exports.LivroListDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class LivroListDTO {
}
exports.LivroListDTO = LivroListDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'ID é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'ID deve ser uma string' }),
    __metadata("design:type", String)
], LivroListDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Título é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Título deve ser uma string' }),
    __metadata("design:type", String)
], LivroListDTO.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Autor é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Autor deve ser uma string' }),
    __metadata("design:type", String)
], LivroListDTO.prototype, "autor", void 0);
class LivroCreateDTO {
}
exports.LivroCreateDTO = LivroCreateDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Título é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Título deve ser uma string' }),
    __metadata("design:type", String)
], LivroCreateDTO.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Autor é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Autor deve ser uma string' }),
    __metadata("design:type", String)
], LivroCreateDTO.prototype, "autor", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)({ message: 'Ano é obrigatório' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Ano deve ser um número' }),
    __metadata("design:type", Number)
], LivroCreateDTO.prototype, "ano", void 0);

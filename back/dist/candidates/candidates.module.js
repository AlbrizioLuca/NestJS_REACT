"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatesModule = void 0;
const common_1 = require("@nestjs/common");
const candidates_service_1 = require("./candidates.service");
const candidates_controller_1 = require("./candidates.controller");
const typeorm_1 = require("@nestjs/typeorm");
const candidate_entity_1 = require("./entities/candidate.entity");
let CandidatesModule = exports.CandidatesModule = class CandidatesModule {
};
exports.CandidatesModule = CandidatesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([candidate_entity_1.Candidate])],
        controllers: [candidates_controller_1.CandidatesController],
        providers: [candidates_service_1.CandidatesService],
        exports: [candidates_service_1.CandidatesService]
    })
], CandidatesModule);
//# sourceMappingURL=candidates.module.js.map
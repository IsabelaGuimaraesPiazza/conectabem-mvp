"""Módulo de regras de negócio para triagem e vencimento de lotes do ConectaBem."""

from datetime import date


def validar_lote(produto: str, quantidade: int, data_validade: date, data_referencia: date) -> dict:
    """Valida os dados de entrada de um lote e classifica sua urgência de distribuição."""
    if not produto or not produto.strip():
        raise ValueError("O nome do produto é obrigatório.")
    if quantidade <= 0:
        raise ValueError("A quantidade deve ser maior que zero.")

    dias_restantes = (data_validade - data_referencia).days
    status = "URGENTE" if dias_restantes <= 7 else "REGULAR"

    return {
        "produto": produto.strip(),
        "quantidade": quantidade,
        "dias_restantes": dias_restantes,
        "status": status,
    }

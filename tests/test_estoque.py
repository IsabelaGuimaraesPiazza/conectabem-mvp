"""Testes automatizados unitários e de integração para o serviço de estoque."""

from datetime import date
import pytest
from src.estoque_service import validar_lote


def test_lote_proximo_vencimento_retorna_urgente():
    """Garante que itens com vencimento em até 7 dias recebam alerta URGENTE."""
    resultado = validar_lote(
        produto="Leite Integral",
        quantidade=12,
        data_validade=date(2026, 11, 15),
        data_referencia=date(2026, 11, 10),
    )
    assert resultado["status"] == "URGENTE"
    assert resultado["dias_restantes"] == 5


def test_lote_prazo_longo_retorna_regular():
    """Garante que itens com vencimento acima de 7 dias recebam status REGULAR."""
    resultado = validar_lote(
        produto="Arroz 5kg",
        quantidade=30,
        data_validade=date(2026, 12, 20),
        data_referencia=date(2026, 11, 10),
    )
    assert resultado["status"] == "REGULAR"


def test_quantidade_invalida_dispara_erro():
    """Verifica se quantidades menores ou iguais a zero são bloqueadas."""
    with pytest.raises(ValueError):
        validar_lote(
            produto="Feijão 1kg",
            quantidade=0,
            data_validade=date(2026, 12, 1),
            data_referencia=date(2026, 11, 10),
        )

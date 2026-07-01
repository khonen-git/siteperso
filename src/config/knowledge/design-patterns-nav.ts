import type { TreeItem } from './types';

export interface DesignPatternsLabels {
  title: string;
  creational: string;
  structural: string;
  behavioral: string;
  abstractFactory: string;
  builder: string;
  factoryMethod: string;
  prototype: string;
  singleton: string;
  adapter: string;
  bridge: string;
  composite: string;
  decorator: string;
  facade: string;
  flyweight: string;
  proxy: string;
  chainOfResponsibility: string;
  command: string;
  interpreter: string;
  iterator: string;
  mediator: string;
  memento: string;
  observer: string;
  state: string;
  strategy: string;
  templateMethod: string;
  visitor: string;
}

/** Arbre design patterns — chemins legacy `/knowledge/programming/…` jusqu'à PR2. */
export function getDesignPatternsNav(
  basePath: string,
  labels: DesignPatternsLabels,
): TreeItem {
  return {
    title: labels.title,
    href: `${basePath}/design-patterns`,
    children: [
      {
        title: labels.creational,
        href: `${basePath}/design-patterns/creational`,
        children: [
          { title: labels.abstractFactory, href: `${basePath}/design-patterns/creational/abstract-factory` },
          { title: labels.builder, href: `${basePath}/design-patterns/creational/builder` },
          { title: labels.factoryMethod, href: `${basePath}/design-patterns/creational/factory-method` },
          { title: labels.prototype, href: `${basePath}/design-patterns/creational/prototype` },
          { title: labels.singleton, href: `${basePath}/design-patterns/creational/singleton` },
        ],
      },
      {
        title: labels.structural,
        href: `${basePath}/design-patterns/structural`,
        children: [
          { title: labels.adapter, href: `${basePath}/design-patterns/structural/adapter` },
          { title: labels.bridge, href: `${basePath}/design-patterns/structural/bridge` },
          { title: labels.composite, href: `${basePath}/design-patterns/structural/composite` },
          { title: labels.decorator, href: `${basePath}/design-patterns/structural/decorator` },
          { title: labels.facade, href: `${basePath}/design-patterns/structural/facade` },
          { title: labels.flyweight, href: `${basePath}/design-patterns/structural/flyweight` },
          { title: labels.proxy, href: `${basePath}/design-patterns/structural/proxy` },
        ],
      },
      {
        title: labels.behavioral,
        href: `${basePath}/design-patterns/behavioral`,
        children: [
          { title: labels.chainOfResponsibility, href: `${basePath}/design-patterns/behavioral/chain-of-responsibility` },
          { title: labels.command, href: `${basePath}/design-patterns/behavioral/command` },
          { title: labels.interpreter, href: `${basePath}/design-patterns/behavioral/interpreter` },
          { title: labels.iterator, href: `${basePath}/design-patterns/behavioral/iterator` },
          { title: labels.mediator, href: `${basePath}/design-patterns/behavioral/mediator` },
          { title: labels.memento, href: `${basePath}/design-patterns/behavioral/memento` },
          { title: labels.observer, href: `${basePath}/design-patterns/behavioral/observer` },
          { title: labels.state, href: `${basePath}/design-patterns/behavioral/state` },
          { title: labels.strategy, href: `${basePath}/design-patterns/behavioral/strategy` },
          { title: labels.templateMethod, href: `${basePath}/design-patterns/behavioral/template-method` },
          { title: labels.visitor, href: `${basePath}/design-patterns/behavioral/visitor` },
        ],
      },
    ],
  };
}
